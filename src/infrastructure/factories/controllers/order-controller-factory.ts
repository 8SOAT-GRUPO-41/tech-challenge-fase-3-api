import { OrderController } from '@/infrastructure/http/controllers/order-controller'
import { makeLoadOrders } from '../usecases/order/load-orders-factory'
import { makeCreateOrder } from '../usecases/order/create-order-factory'

export const makeOrderController = (): OrderController => {
	return new OrderController(makeLoadOrders(), makeCreateOrder())
}
