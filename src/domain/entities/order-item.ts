import { Price } from '../value-objects'
import type { Product } from './product'

export class OrderItem {
	private constructor(
		private product: Product,
		private quantity: number,
		private price: Price
	) {}

	static create(product: Product, quantity: number, price: number): OrderItem {
		const total = quantity * price
		return new OrderItem(product, quantity, new Price(total))
	}

	static restore(product: Product, quantity: number, price: number): OrderItem {
		return new OrderItem(product, quantity, new Price(price))
	}

	getQuantity = () => this.quantity

	getPrice = () => this.price.getValue()

	setQuantity = (quantity: number) => {
		this.quantity = quantity
	}

	setPrice = (price: number) => {
		this.price = new Price(price)
	}

	toJSON() {
		return {
			productId: this.product.toJSON(),
			quantity: this.quantity,
			price: this.getPrice()
		}
	}
}
