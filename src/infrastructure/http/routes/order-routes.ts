import { makeOrderController } from '@/infrastructure/factories/controllers/order-controller-factory'
import { errorResponseSchema } from '@/infrastructure/swagger/error-response-schema'
import type { FastifyPluginAsync } from 'fastify'
import { ErrorCodes } from '../error-handler'

const orderRoutes: FastifyPluginAsync = async (server, _opts): Promise<void> => {
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
						items: {
							type: 'object',
							properties: {
								orderId: { type: 'string', example: '23e65bdf-812c-45b9-8e17-2607f4bc37ae' },
								status: { type: 'string', example: 'RECEIVED' },
								total: { type: 'number', example: 9 },
								customer: {
									type: 'object',
									properties: {
										customerId: { type: 'string', example: '3ce7b6fe-0fef-45e3-9027-280a3b935067' },
										name: { type: 'string', example: 'teste' },
										email: { type: 'string', format: 'email', example: 'rafa@mail.com' },
										cpf: { type: 'string', example: '44204681816' }
									}
								},
								orderItems: {
									type: 'array',
									items: {
										type: 'object',
										properties: {
											product: {
												type: 'object',
												properties: {
													productId: { type: 'string', example: '882a0903-0c6b-4be5-8179-a4ef1f069bc9' },
													name: { type: 'string', example: 'Coca Zero' },
													price: { type: 'number', example: 9 },
													description: { type: 'string', example: 'Uma coca bem geladinha' },
													category: { type: 'string', example: 'Bebida' }
												}
											},
											quantity: { type: 'number', example: 1 },
											price: { type: 'number', example: 9 }
										}
									}
								}
							}
						}
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
				},
				response: {
					200: {
						type: 'object',
						properties: {
							orderId: {
								type: 'string',
								example: 'c9368421-a270-4be1-ac9e-008c40145717'
							},
							status: {
								type: 'string',
								example: 'RECEIVED'
							},
							total: {
								type: 'number',
								example: 99
							},
							customer: {
								type: 'object',
								properties: {
									customerId: {
										type: 'string',
										example: '3ce7b6fe-0fef-45e3-9027-280a3b935067'
									},
									name: {
										type: 'string',
										example: 'teste'
									},
									email: {
										type: 'string',
										format: 'email',
										example: 'rafa@mail.com'
									},
									cpf: {
										type: 'string',
										example: '44204681816'
									}
								}
							},
							orderItems: {
								type: 'array',
								items: {
									type: 'object',
									properties: {
										product: {
											type: 'object',
											properties: {
												productId: {
													type: 'string',
													example: '882a0903-0c6b-4be5-8179-a4ef1f069bc9'
												},
												name: {
													type: 'string',
													example: 'Coca Zero'
												},
												price: {
													type: 'string',
													example: '9.00'
												},
												description: {
													type: 'string',
													example: 'Uma coca bem geladinha'
												},
												category: {
													type: 'string',
													example: 'Bebida'
												}
											}
										},
										quantity: {
											type: 'number',
											example: 1
										},
										price: {
											type: 'number',
											example: 9
										}
									}
								}
							}
						}
					},
					404: errorResponseSchema(404, ErrorCodes.NOT_FOUND),
					422: errorResponseSchema(422, ErrorCodes.UNPROCESSABLE_ENTITY),
					500: errorResponseSchema(500, ErrorCodes.INTERNAL_SERVER_ERROR)
				}
			}
		},
		orderController.createOrder.bind(orderController)
	)
}

export default orderRoutes
