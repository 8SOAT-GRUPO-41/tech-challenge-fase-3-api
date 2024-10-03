import type { FastifyPluginAsync } from 'fastify'
import { makeCreateCustomerController, makeLoadCustomerByCpfController } from '@/infrastructure/factories/controllers'
import { errorResponseSchema } from '@/infrastructure/swagger/error-response-schema'
import { ErrorCodes } from '@/infrastructure/http/error-handler'
import { customerSchema, customerSchemaWithoutId } from '@/infrastructure/swagger/schemas/customer'
import { adaptFastifyRoute } from '../fastify-adapter'

export const customerRoutes: FastifyPluginAsync = async (server, _opts): Promise<void> => {
	const loadCustomerController = makeLoadCustomerByCpfController()
	const createCustomerController = makeCreateCustomerController()

	server.post(
		'',
		{
			schema: {
				tags: ['Customers'],
				summary: 'Create a new customer',
				body: {
					type: 'object',
					properties: customerSchemaWithoutId.properties,
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
					201: customerSchema,
					400: errorResponseSchema(400, ErrorCodes.BAD_REQUEST),
					409: errorResponseSchema(409, ErrorCodes.DUPLICATE_ENTITY),
					422: errorResponseSchema(422, ErrorCodes.UNPROCESSABLE_ENTITY),
					500: errorResponseSchema(500, ErrorCodes.INTERNAL_SERVER_ERROR)
				}
			}
		},
		adaptFastifyRoute(createCustomerController)
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
						cpf: customerSchema.properties.cpf
					},
					required: ['cpf']
				},
				response: {
					200: customerSchema,
					404: errorResponseSchema(404, ErrorCodes.NOT_FOUND),
					500: errorResponseSchema(500, ErrorCodes.INTERNAL_SERVER_ERROR)
				}
			}
		},
		adaptFastifyRoute(loadCustomerController)
	)
}
