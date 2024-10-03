import { CreateOrderController, LoadOrdersController } from '@/infrastructure/http/controllers/order-controller'
import { makeLoadOrders, makeCreateOrder } from '@/infrastructure/factories/usecases/order'
import type { HttpController } from '@/infrastructure/http/interfaces/controller'

export const makeCreateOrderController = (): HttpController => {
	return new CreateOrderController(makeCreateOrder())
}

export const makeLoadOrdersController = (): HttpController => {
	return new LoadOrdersController(makeLoadOrders())
}
