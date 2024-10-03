import { FakeCheckoutController } from '@/infrastructure/http/controllers/payment-controller'
import { makeUpdateOrderStatus } from '@/infrastructure/factories/usecases/order'
import type { HttpController } from '@/infrastructure/http/interfaces'

export const makeFakeCheckoutController = (): HttpController => {
	return new FakeCheckoutController(makeUpdateOrderStatus())
}
