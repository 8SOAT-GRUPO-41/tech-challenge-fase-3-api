import type { Customer } from '@/domain/entities'
import { CreateCustomer } from '@/application/usecases/customer/create-customer'
import type { CustomerRepository } from '@/application/ports/customer-repository'
import { InvalidParamError } from '@/domain/errors/invalid-param-error'

interface SutTypes {
	sut: CreateCustomer
}

class CustomerRepositorySpy implements CustomerRepository {
	async save(customer: Customer): Promise<void> {}
}

const makeSut = () => {
	const sut = new CreateCustomer(new CustomerRepositorySpy())
	return {
		sut
	}
}

describe('Create Customer', () => {
	it('should create a customer', async () => {
		const { sut } = makeSut()
		const input = {
			name: 'any_name',
			email: 'any_email@mail.com',
			cpf: '44204681816'
		}
		const customer = await sut.execute(input)
		expect(customer).toEqual({
            customerId: customer.customerId,
            name: 'any_name',
            email: 'any_email@mail.com',
            cpf: '44204681816'
        })
	})

    it('should throw if email is invalid', async () => {
        const { sut } = makeSut()
        const input = {
            name: 'any_name',
            email: 'invalid_email',
            cpf: '44204681816'
        }
        const promise = sut.execute(input)
        expect(promise).rejects.toThrow(new InvalidParamError('email'))
    })

    it('should throw if cpf is invalid', async () => {
        const { sut } = makeSut()
        const input = {
            name: 'any_name',
            email: 'any_email@mail.com',
            cpf: 'invalid_cpf'
        }
        const promise = sut.execute(input)
        expect(promise).rejects.toThrow(new InvalidParamError('cpf'))
    })
})
