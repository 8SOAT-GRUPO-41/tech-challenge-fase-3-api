import type { FastifyPluginAsync } from 'fastify'
import { makeOrderController } from '@/infrastructure/factories/controllers'
import { errorResponseSchema } from '@/infrastructure/swagger/error-response-schema'
import { ErrorCodes } from '@/infrastructure/http/error-handler'
import { orderItemSchema } from '@/infrastructure/swagger/schemas/order-item'
import { orderSchema } from '@/infrastructure/swagger/schemas/order'
import { customerSchema } from '@/infrastructure/swagger/schemas/customer'

export const orderRoutes: FastifyPluginAsync = async (server, _opts): Promise<void> => {
	const orderController = makeOrderController()

	server.get(
		'',
		{
			schema: {
				tags: ['Orders'],
				summary: 'List all orders',
				response: {
					200: {
						type: 'array',
						items: orderSchema
					},
					500: errorResponseSchema(500, ErrorCodes.INTERNAL_SERVER_ERROR)
				}
			}
		},
		orderController.loadOrders.bind(orderController)
	)

	server.post(
		'',
		{
			schema: {
				tags: ['Orders'],
				summary: 'Create a new order',
				body: {
					type: 'object',
					properties: {
						customerId: customerSchema.properties.customerId,
						products: {
							type: 'array',
							items: {
								type: 'object',
								properties: {
									productId: orderItemSchema.properties.product.properties.productId,
									quantity: orderItemSchema.properties.quantity
								}
							}
						}
					},
					required: ['customerId', 'products']
				},
				response: {
					201: orderSchema,
					404: errorResponseSchema(404, ErrorCodes.NOT_FOUND),
					422: errorResponseSchema(422, ErrorCodes.UNPROCESSABLE_ENTITY),
					500: errorResponseSchema(500, ErrorCodes.INTERNAL_SERVER_ERROR)
				}
			}
		},
		orderController.createOrder.bind(orderController)
	)
}
