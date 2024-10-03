import type { CreateOrder, LoadOrders } from '@/application/usecases/order'
import type { HttpRequest, HttpResponse } from '@/infrastructure/http/interfaces'
import { HttpStatusCode } from '@/infrastructure/http/helper'
import type { HttpController } from '@/infrastructure/http/interfaces/controller'

interface CreateOrderInput {
	customerId: string
	products: { productId: string; quantity: number }[]
}

export class CreateOrderController implements HttpController {
	constructor(private readonly createOrderUseCase: CreateOrder) {}

	async handle(request: HttpRequest<CreateOrderInput>): Promise<HttpResponse> {
		const input = request.body
		const result = await this.createOrderUseCase.execute(input)
		return {
			statusCode: HttpStatusCode.CREATED,
			body: result.toJSON()
		}
	}
}

export class LoadOrdersController implements HttpController {
	constructor(private readonly loadOrdersUseCase: LoadOrders) {}

	async handle(_request: HttpRequest): Promise<HttpResponse> {
		const result = await this.loadOrdersUseCase.execute()
		return {
			statusCode: HttpStatusCode.OK,
			body: result.map((order) => order.toJSON())
		}
	}
}
