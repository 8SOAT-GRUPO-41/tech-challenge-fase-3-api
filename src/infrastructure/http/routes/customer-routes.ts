import { makeCustomerController } from '@/infrastructure/factories/controllers/customer-controller-factory'
import { errorResponseSchema } from '@/infrastructure/swagger/error-response-schema'
import type { FastifyPluginAsync } from 'fastify'
import { ErrorCodes } from '../error-handler'

const customerRoutes: FastifyPluginAsync = async (server, _opts): Promise<void> => {
	const customerController = makeCustomerController()

	server.post(
		'',
		{
			schema: {
				tags: ['Customers'],
				summary: 'Create a new customer',
				body: {
					type: 'object',
					properties: {
						name: { type: 'string' },
						email: { type: 'string' },
						cpf: { type: 'string', minLength: 11, maxLength: 11, pattern: '^[0-9]*$' }
					},
					examples: [
						{
							name: 'John Doe',
							email: 'example@mail.com',
							cpf: '12345678901'
						},
						{
							cpf: '12345678901'
						}
					],
					required: ['cpf']
				},
				response: {
					201: {
						type: 'object',
						properties: {
							customerId: { type: 'string' },
							name: { type: 'string' },
							email: { type: 'string' },
							cpf: { type: 'string' }
						}
					},
					400: errorResponseSchema(400, ErrorCodes.BAD_REQUEST),
					409: errorResponseSchema(409, ErrorCodes.DUPLICATE_ENTITY),
					422: errorResponseSchema(422, ErrorCodes.UNPROCESSABLE_ENTITY),
					500: errorResponseSchema(500, ErrorCodes.INTERNAL_SERVER_ERROR)
				}
			}
		},
		customerController.createCustomer.bind(customerController)
	)

	server.get(
		'/:cpf',
		{
			schema: {
				tags: ['Customers'],
				summary: 'Load a customer by CPF',
				params: {
					type: 'object',
					properties: {
						cpf: { type: 'string', minLength: 11, maxLength: 11, pattern: '^[0-9]*$', examples: ['12345678901'] }
					},
					required: ['cpf']
				},
				response: {
					200: {
						type: 'object',
						properties: {
							customerId: { type: 'string' },
							name: { type: 'string' },
							email: { type: 'string' },
							cpf: { type: 'string' }
						}
					},
					404: errorResponseSchema(404, ErrorCodes.NOT_FOUND),
					500: errorResponseSchema(500, ErrorCodes.INTERNAL_SERVER_ERROR)
				}
			}
		},
		customerController.loadCustomerByCpf.bind(customerController)
	)
}

export default customerRoutes
