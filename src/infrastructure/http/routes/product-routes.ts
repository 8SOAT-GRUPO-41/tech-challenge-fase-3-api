import type { FastifyPluginAsync } from 'fastify'
import { makeProductController } from '@/infrastructure/factories/controllers/product-controller-factory'

const productRoutes: FastifyPluginAsync = async (server, _opts): Promise<void> => {
	const productController = makeProductController()

	server.post(
		'/products',
		{
			schema: {
				tags: ['Products'],
				body: {
					type: 'object',
					properties: {
						name: { type: 'string' },
						price: { type: 'number' },
						description: { type: 'string' },
						category: { type: 'string' }
					},
					required: ['name', 'price', 'description', 'category']
				}
			}
		},
		productController.createProduct.bind(productController)
	)
}

export default productRoutes
