import { makeOrderRepository } from '@/infrastructure/factories/repositories/order-repository-factory'
import { LoadOrders } from '@/application/usecases/order/load-orders'

export const makeLoadOrders = (): LoadOrders => {
	return new LoadOrders(makeOrderRepository())
}
