import { Price } from '../value-objects'
import { OrderItemQuantity } from '../value-objects/order-item-quantity'
import type { Product } from './product'

export class OrderItem {
	private constructor(
		private readonly product: Product,
		private quantity: OrderItemQuantity,
		private price: Price
	) {}

	static create(product: Product, quantity: number): OrderItem {
		const total = quantity * product.getPrice()
		return new OrderItem(product, new OrderItemQuantity(quantity), new Price(total))
	}

	static restore(product: Product, quantity: number): OrderItem {
		const total = quantity * product.getPrice()
		return new OrderItem(product, new OrderItemQuantity(quantity), new Price(total))
	}

	getProduct = () => this.product

	getQuantity = () => this.quantity.getValue()

	getPrice = () => this.price.getValue()

	setQuantity = (quantity: number) => {
		this.quantity = new OrderItemQuantity(quantity)
	}

	setPrice = (price: number) => {
		this.price = new Price(price)
	}

	toJSON() {
		return {
			product: this.product.toJSON(),
			quantity: this.quantity.getValue(),
			price: this.getPrice()
		}
	}
}
