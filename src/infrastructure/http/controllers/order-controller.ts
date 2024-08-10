import type { FastifyReply, FastifyRequest } from 'fastify'
import { HttpStatusCode } from '../helper'
import type { LoadOrders } from '@/application/usecases/order/load-orders'
import type { CreateOrder } from '@/application/usecases/order/create-order'

type CreateOrderInput = {
	customerId: string
	products: { productId: string; quantity: number }[]
}

export class OrderController {
	constructor(
		private readonly loadOrdersUseCase: LoadOrders,
		private readonly createOrderUseCase: CreateOrder
	) {}

	async loadOrders(_request: FastifyRequest, reply: FastifyReply) {
		const result = await this.loadOrdersUseCase.execute()
		return reply.status(HttpStatusCode.OK).send(result.map((order) => order.toJSON()))
	}

	async createOrder(request: FastifyRequest, reply: FastifyReply) {
		const { customerId, products } = request.body as CreateOrderInput
		const result = await this.createOrderUseCase.execute({ customerId, products })
		return reply.status(HttpStatusCode.CREATED).send(result.toJSON())
	}
}
