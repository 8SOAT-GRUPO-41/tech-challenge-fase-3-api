import { makeOrderController } from '@/infrastructure/factories/controllers/order-controller-factory'
import type { FastifyPluginAsync } from 'fastify'

const orderRoutes: FastifyPluginAsync = async (server, _opts): Promise<void> => {
	const orderController = makeOrderController()

	server.get(
		'/',
		{
			schema: {
				tags: ['Orders']
			}
		},
		orderController.loadOrders.bind(orderController)
	)

	server.post(
		'/',
		{
			schema: {
				tags: ['Orders'],
				body: {
					type: 'object',
					properties: {
						customerId: { type: 'string' },
						products: {
							type: 'array',
							items: {
								type: 'object',
								properties: {
									productId: { type: 'string' },
									quantity: { type: 'number' }
								}
							}
						}
					},
					required: ['customerId', 'products']
				}
			}
		},
		orderController.createOrder.bind(orderController)
	)
}

export default orderRoutes
