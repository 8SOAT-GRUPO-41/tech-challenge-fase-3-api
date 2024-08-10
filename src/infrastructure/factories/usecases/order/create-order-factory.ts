import { makeOrderRepository } from '@/infrastructure/factories/repositories/order-repository-factory'
import { CreateOrder } from '@/application/usecases/order/create-order'
import { makeProductRepository } from '../../repositories/product-repository-factory'
import { makeCustomerRepository } from '../../repositories/customer-repository-factory'

export const makeCreateOrder = (): CreateOrder => {
	return new CreateOrder(makeOrderRepository(), makeProductRepository(), makeCustomerRepository())
}
