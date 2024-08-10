import type { OrderRepository } from '@/application/ports/order-repository'
import { OrderStatus } from '@/domain/enums'
import { NotFoundError } from '@/domain/errors/not-found-error'

type Input = { orderId: string } & Partial<{
	status: OrderStatus
}>

export class UpdateOrderStatus {
	constructor(private readonly orderRepository: OrderRepository) {}

	async execute(input: Input): Promise<any> {
		const { orderId, status } = input
		const order = await this.orderRepository.findById(orderId)
		if (!order) {
			throw new NotFoundError('Order not found')
		}
		switch (status) {
			case OrderStatus.IN_PREPARATION:
				order.prepare()
				break
			case OrderStatus.READY:
				order.ready()
				break
			case OrderStatus.COMPLETED:
				order.complete()
				break
		}
		await this.orderRepository.update(order)
	}
}
