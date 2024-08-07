import { CustomerController } from '@/infrastructure/controllers/customer-controller'
import { makeCreateCustomer } from '@/infrastructure/factories/usecases/create-customer-factory'

export const makeCustomerController = (): CustomerController => {
	return new CustomerController(makeCreateCustomer())
}
