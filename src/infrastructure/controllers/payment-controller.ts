import { HttpStatusCode } from '@/infrastructure/http/helper'
import type { HttpRequest, HttpResponse, HttpController } from '@/infrastructure/http/interfaces'
import type { OrderStatus } from '@/domain/enums'
import type { UpdateOrderStatus } from '@/application/usecases/order'

interface FakeCheckoutInput {
	orderId: string
	status: OrderStatus
}

export class FakeCheckoutController implements HttpController {
	constructor(private readonly updateOrderUseCase: UpdateOrderStatus) {}

	async handle(request: HttpRequest<FakeCheckoutInput>): Promise<HttpResponse> {
		const input = request.body
		const result = await this.updateOrderUseCase.execute(input)
		return {
			statusCode: HttpStatusCode.OK,
			body: result.toJSON()
		}
	}
}
