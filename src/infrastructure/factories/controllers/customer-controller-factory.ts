import { LoadCustomerByCpfController, CreateCustomerController } from '@/infrastructure/controllers'
import { makeCreateCustomer, makeLoadCustomerByCpf } from '@/infrastructure/factories/usecases/customer'
import type { HttpController } from '@/infrastructure/http/interfaces/controller'

export const makeLoadCustomerByCpfController = (): HttpController => {
	return new LoadCustomerByCpfController(makeLoadCustomerByCpf())
}

export const makeCreateCustomerController = (): HttpController => {
	return new CreateCustomerController(makeCreateCustomer())
}
