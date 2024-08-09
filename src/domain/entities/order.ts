import { OrderStatus } from '../enums'
import type { Product } from './product'

export class Order {
	private constructor(
		readonly orderId: string,
		private customerId: string,
		private products: Product[],
		private status: OrderStatus
	) {}

	static create(customerId: string, products: Product[]) {
		const orderId = crypto.randomUUID()
		return new Order(orderId, customerId, products, OrderStatus.RECEIVED)
	}

	static restore(orderId: string, customerId: string, products: Product[], status: OrderStatus) {
		return new Order(orderId, customerId, products, status)
	}

	getCustomerId = () => this.customerId

	setProducts = (products: Product[]) => {
		this.products = products
	}

	getProducts = () => this.products

	getStatus = () => this.status

	private canTransitionTo(status: OrderStatus): boolean {
		const transitions: Record<OrderStatus, OrderStatus[]> = {
			[OrderStatus.RECEIVED]: [OrderStatus.IN_PREPARATION],
			[OrderStatus.IN_PREPARATION]: [OrderStatus.READY],
			[OrderStatus.READY]: [OrderStatus.COMPLETED],
			[OrderStatus.COMPLETED]: []
		}
		return transitions[this.status].includes(status) ?? false
	}

	private transitionTo(status: OrderStatus) {
		if (!this.canTransitionTo(status)) {
			throw new Error(`Can't transition from ${this.status} to ${status}`)
		}
		this.status = status
	}

	prepare() {
		this.transitionTo(OrderStatus.IN_PREPARATION)
	}

	ready() {
		this.transitionTo(OrderStatus.READY)
	}

	complete() {
		this.transitionTo(OrderStatus.COMPLETED)
	}
}
