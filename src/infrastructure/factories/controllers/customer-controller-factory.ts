import { CustomerController } from '@/infrastructure/http/controllers/customer-controller'
import { makeCreateCustomer } from '@/infrastructure/factories/usecases/create-customer-factory'
import { makeLoadCustomerByCpf } from '../usecases/load-customer-by-cpf-factory'

export const makeCustomerController = (): CustomerController => {
	return new CustomerController(makeCreateCustomer(), makeLoadCustomerByCpf())
}
