import { LoadCustomerByCpf } from '@/application/usecases/customer/load-customer-by-cpf'
import { makeCustomerRepository } from '../repositories/customer-repository-factory'

export const makeLoadCustomerByCpf = (): LoadCustomerByCpf => {
	return new LoadCustomerByCpf(makeCustomerRepository())
}
