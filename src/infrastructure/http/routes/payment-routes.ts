import type { FastifyPluginAsync } from 'fastify'
import { makeFakeCheckoutController } from '@/infrastructure/factories/controllers'
import { errorResponseSchema } from '@/infrastructure/swagger/error-response-schema'
import { ErrorCodes } from '@/infrastructure/http/error-handler'
import { orderSchema } from '@/infrastructure/swagger/schemas/order'
import { adaptFastifyRoute } from '../fastify-adapter'

export const paymentRoutes: FastifyPluginAsync = async (server, _opts): Promise<void> => {
	const fakeCheckoutController = makeFakeCheckoutController()

	server.post(
		'',
		{
			schema: {
				tags: ['Payments'],
				summary: 'Fake checkout for simulation purpose',
				body: {
					type: 'object',
					properties: {
						orderId: { type: 'string', format: 'uuid' },
						status: {
							type: 'string',
							enum: ['PAID', 'RECEIVED', 'IN_PREPARATION', 'READY', 'COMPLETED']
						}
					},

					required: ['orderId', 'status']
				},
				response: {
					200: orderSchema,
					400: errorResponseSchema(400, ErrorCodes.BAD_REQUEST),
					422: errorResponseSchema(422, ErrorCodes.UNPROCESSABLE_ENTITY),
					500: errorResponseSchema(500, ErrorCodes.INTERNAL_SERVER_ERROR)
				}
			}
		},
		adaptFastifyRoute(fakeCheckoutController)
	)
}
