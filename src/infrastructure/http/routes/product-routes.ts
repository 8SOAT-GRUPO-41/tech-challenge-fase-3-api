import type { FastifyPluginAsync } from 'fastify'
import { makeProductController } from '@/infrastructure/factories/controllers'
import { ErrorCodes } from '@/infrastructure/http/error-handler'
import { errorResponseSchema } from '@/infrastructure/swagger/error-response-schema'
import { productSchema, productSchemaWithoutId } from '@/infrastructure/swagger/schemas/product'

export const productRoutes: FastifyPluginAsync = async (server, _opts): Promise<void> => {
	const productController = makeProductController()

	server.post(
		'',
		{
			schema: {
				tags: ['Products'],
				summary: 'Create a new product',
				body: {
					type: 'object',
					properties: productSchemaWithoutId.properties,
					required: ['name', 'price', 'description', 'category']
				},
				response: {
					201: productSchema,
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
						id: productSchema.properties.productId
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
						id: productSchema.properties.productId
					},
					required: ['id']
				},
				body: {
					type: 'object',
					properties: productSchemaWithoutId.properties,
					examples: [
						{
							price: 10
						}
					]
				},
				response: {
					200: productSchema,
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
						category: productSchema.properties.category
					},
					required: ['category']
				},
				response: {
					200: {
						type: 'array',
						items: productSchema
					},
					400: errorResponseSchema(400, ErrorCodes.BAD_REQUEST),
					500: errorResponseSchema(500, ErrorCodes.INTERNAL_SERVER_ERROR)
				}
			}
		},
		productController.loadProductsByCategory.bind(productController)
	)
}
