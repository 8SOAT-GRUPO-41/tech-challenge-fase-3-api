import { makeCustomerController } from '@/infrastructure/factories/controllers/customer-controller-factory'
import type { FastifyPluginAsync } from 'fastify'

const customerRoutes: FastifyPluginAsync = async (server, _opts): Promise<void> => {
	const customerController = makeCustomerController()

	server.post(
		'/customers',
		{
			schema: {
				tags: ['Customers'],
				body: {
					type: 'object',
					properties: {
						name: { type: 'string' },
						email: { type: 'string' },
						cpf: { type: 'string' }
					},
					required: ['name', 'email', 'cpf']
				}
			}
		},
		customerController.createCustomer.bind(customerController)
	)

	server.get(
		'/customers/:cpf',
		{
			schema: {
				tags: ['Customers'],
				params: {
					type: 'object',
					properties: {
						cpf: { type: 'string' }
					},
					required: ['cpf']
				}
			}
		},
		customerController.loadCustomerByCpf.bind(customerController)
	)
}

export default customerRoutes
