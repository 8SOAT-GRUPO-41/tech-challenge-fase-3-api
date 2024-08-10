import type { CustomerRepository } from '@/application/ports/customer-repository'
import type { OrderRepository } from '@/application/ports/order-repository'
import type { ProductRepository } from '@/application/ports/product-repository'
import { Order } from '@/domain/entities'
import { OrderItem } from '@/domain/entities/order-item'
import { NotFoundError } from '@/domain/errors/not-found-error'

type Input = {
	customerId: string
	products: { productId: string; quantity: number }[]
}

export class CreateOrder {
	constructor(
		private readonly orderRepository: OrderRepository,
		private readonly productRepository: ProductRepository,
		private readonly customerRepository: CustomerRepository
	) {}

	async execute(params: Input): Promise<Order> {
		const { customerId, products } = params
		const customer = await this.customerRepository.findById(customerId)
		if (!customer) {
			throw new NotFoundError('Customer not found')
		}
		const orderItems = await Promise.all(
			products.map(async ({ productId, quantity }) => {
				const product = await this.productRepository.findById(productId)
				if (!product) {
					throw new NotFoundError('Product not found')
				}
				return OrderItem.create(product, quantity, product.getPrice())
			})
		)
		const order = Order.create(customer, orderItems)
		await this.orderRepository.save(order)
		return order
	}
}
