import { OrderController } from '@/infrastructure/http/controllers/order-controller'
import { makeLoadOrders, makeCreateOrder } from '@/infrastructure/factories/usecases/order'

export const makeOrderController = (): OrderController => {
	return new OrderController(makeLoadOrders(), makeCreateOrder())
}
