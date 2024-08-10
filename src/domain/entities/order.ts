import { OrderStatus } from '../enums'
import { DomainError } from '../errors'
import { Price } from '../value-objects'
import type { Customer } from './customer'
import type { OrderItem } from './order-item'

export class Order {
	private constructor(
		readonly orderId: string,
		private customer: Customer,
		private orderItems: OrderItem[],
		private status: OrderStatus,
		private total: Price
	) {
		if (orderItems.length === 0) {
			throw new DomainError('Order must have at least one item')
		}
	}

	static create(customer: Customer, orderItems: OrderItem[]): Order {
		const orderId = crypto.randomUUID()
		const total = Order.calculateTotal(orderItems)
		return new Order(orderId, customer, orderItems, OrderStatus.RECEIVED, new Price(total))
	}

	static restore(orderId: string, customer: Customer, orderItems: OrderItem[], status: OrderStatus): Order {
		const total = Order.calculateTotal(orderItems)
		return new Order(orderId, customer, orderItems, status, new Price(total))
	}

	private static calculateTotal(orderItems: OrderItem[]): number {
		return orderItems.reduce((acc, item) => acc + item.getPrice(), 0)
	}

	getCustomer = () => this.customer

	getOrderItems = () => this.orderItems

	setOrderItems = (orderItems: OrderItem[]) => {
		if (orderItems.length === 0) {
			throw new DomainError('Order must have at least one item')
		}
		this.orderItems = orderItems
		this.total = new Price(Order.calculateTotal(orderItems))
	}

	getStatus = () => this.status

	getTotal = () => this.total.getValue()

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
			throw new DomainError(`Can't transition from ${this.status} to ${status}`)
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

	toJSON() {
		return {
			orderId: this.orderId,
			status: this.status,
			total: this.total.getValue(),
			customer: this.customer.toJSON(),
			orderItems: this.orderItems.map((item) => item.toJSON())
		}
	}
}
