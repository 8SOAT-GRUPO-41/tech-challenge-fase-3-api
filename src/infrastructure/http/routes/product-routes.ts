import type { FastifyPluginAsync } from 'fastify'
import { makeProductController } from '@/infrastructure/factories/controllers/product-controller-factory'

const productRoutes: FastifyPluginAsync = async (server, _opts): Promise<void> => {
	const productController = makeProductController()

	server.post(
		'',
		{
			schema: {
				tags: ['Products'],
				body: {
					type: 'object',
					properties: {
						name: { type: 'string' },
						price: { type: 'number' },
						description: { type: 'string' },
						category: { type: 'string', enum: ['Lanche', 'Acompanhamento', 'Bebida', 'Sobremesa'] }
					},
					required: ['name', 'price', 'description', 'category']
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
				params: {
					type: 'object',
					properties: {
						id: { type: 'string' }
					},
					required: ['id']
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
				params: {
					type: 'object',
					properties: {
						id: { type: 'string' }
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
				params: {
					type: 'object',
					properties: {
						category: { type: 'string', enum: ['Lanche', 'Acompanhamento', 'Bebida', 'Sobremesa'] }
					},
					required: ['category']
				}
			}
		},
		productController.loadProductsByCategory.bind(productController)
	)
}

export default productRoutes
