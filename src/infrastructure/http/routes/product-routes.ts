import type { FastifyPluginAsync } from 'fastify'
import { makeProductController } from '@/infrastructure/factories/controllers/product-controller-factory'
import { ErrorCodes } from '../error-handler'
import { errorResponseSchema } from '@/infrastructure/swagger/error-response-schema'

const productRoutes: FastifyPluginAsync = async (server, _opts): Promise<void> => {
	const productController = makeProductController()

	server.post(
		'',
		{
			schema: {
				tags: ['Products'],
				summary: 'Create a new product',
				body: {
					type: 'object',
					properties: {
						name: { type: 'string', minLength: 3 },
						price: { type: 'number' },
						description: { type: 'string' },
						category: { type: 'string', enum: ['Lanche', 'Acompanhamento', 'Bebida', 'Sobremesa'] }
					},
					required: ['name', 'price', 'description', 'category']
				},
				response: {
					201: {
						type: 'object',
						properties: {
							productId: { type: 'string', format: 'uuid' },
							name: { type: 'string' },
							price: { type: 'number' },
							description: { type: 'string' },
							category: { type: 'string' }
						}
					},
					400: errorResponseSchema(400, ErrorCodes.BAD_REQUEST),
					422: errorResponseSchema(422, ErrorCodes.UNPROCESSABLE_ENTITY),
					500: errorResponseSchema(500, ErrorCodes.INTERNAL_SERVER_ERROR)
				}
			}
		},
		productController.createProduct.bind(productController)
	)

	server.delete(
		'/:id',
		{
			schema: {
				tags: ['Products'],
				summary: 'Delete a product',
				params: {
					type: 'object',
					properties: {
						id: { type: 'string', format: 'uuid' }
					},
					required: ['id']
				},
				response: {
					204: {},
					404: errorResponseSchema(404, ErrorCodes.NOT_FOUND),
					500: errorResponseSchema(500, ErrorCodes.INTERNAL_SERVER_ERROR)
				}
			}
		},
		productController.deleteProduct.bind(productController)
	)

	server.patch(
		'/:id',
		{
			schema: {
				tags: ['Products'],
				summary: 'Update a product',
				params: {
					type: 'object',
					properties: {
						id: { type: 'string', format: 'uuid' }
					},
					required: ['id']
				},
				body: {
					type: 'object',
					properties: {
						name: { type: 'string' },
						price: { type: 'number' },
						description: { type: 'string' },
						category: { type: 'string', enum: ['Lanche', 'Acompanhamento', 'Bebida', 'Sobremesa'] }
					}
				},
				response: {
					200: {
						type: 'object',
						properties: {
							productId: { type: 'string', format: 'uuid' },
							name: { type: 'string' },
							price: { type: 'number' },
							description: { type: 'string' },
							category: { type: 'string', enum: ['Lanche', 'Acompanhamento', 'Bebida', 'Sobremesa'] }
						}
					},
					404: errorResponseSchema(404, ErrorCodes.NOT_FOUND),
					500: errorResponseSchema(500, ErrorCodes.INTERNAL_SERVER_ERROR)
				}
			}
		},
		productController.updateProduct.bind(productController)
	)

	server.get(
		'/category/:category',
		{
			schema: {
				tags: ['Products'],
				summary: 'Load products by category',
				params: {
					type: 'object',
					properties: {
						category: { type: 'string', enum: ['Lanche', 'Acompanhamento', 'Bebida', 'Sobremesa'] }
					},
					required: ['category']
				},
				response: {
					200: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								productId: { type: 'string', format: 'uuid' },
								name: { type: 'string' },
								price: { type: 'number' },
								description: { type: 'string' },
								category: { type: 'string' }
							}
						}
					},
					400: errorResponseSchema(400, ErrorCodes.BAD_REQUEST),
					500: errorResponseSchema(500, ErrorCodes.INTERNAL_SERVER_ERROR)
				}
			}
		},
		productController.loadProductsByCategory.bind(productController)
	)
}

export default productRoutes
