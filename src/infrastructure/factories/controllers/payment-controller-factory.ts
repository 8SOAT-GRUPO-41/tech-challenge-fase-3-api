import { FakeCheckoutController } from '@/infrastructure/controllers/payment-controller'
import { makeUpdateOrderStatus } from '@/infrastructure/factories/usecases/order'
import type { Controller } from '@/infrastructure/http/interfaces'

export const makeFakeCheckoutController = (): Controller => {
	return new FakeCheckoutController(makeUpdateOrderStatus())
}
