import { CreateOrderController, LoadOrdersController } from '@/infrastructure/controllers/order-controller'
import { makeLoadOrders, makeCreateOrder } from '@/infrastructure/factories/usecases/order'
import type { Controller } from '@/infrastructure/http/interfaces'

export const makeCreateOrderController = (): Controller => {
	return new CreateOrderController(makeCreateOrder())
}

export const makeLoadOrdersController = (): Controller => {
	return new LoadOrdersController(makeLoadOrders())
}
