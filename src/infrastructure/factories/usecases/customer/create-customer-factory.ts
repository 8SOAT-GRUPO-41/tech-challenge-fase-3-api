import { CreateCustomer } from '@/application/usecases/customer/create-customer'
import { makeCustomerRepository } from '@/infrastructure/factories/repositories/customer-repository-factory'

export const makeCreateCustomer = (): CreateCustomer => {
	return new CreateCustomer(makeCustomerRepository())
}
