import { CustomerController } from '@/infrastructure/http/controllers'
import { makeCreateCustomer, makeLoadCustomerByCpf } from '@/infrastructure/factories/usecases/customer'

export const makeCustomerController = (): CustomerController => {
	return new CustomerController(makeCreateCustomer(), makeLoadCustomerByCpf())
}
