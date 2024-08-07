import type { CustomerRepository } from '@/application/ports/customer-repository'
import { Customer } from '@/domain/entities'

type Input = {
	name: string
	email: string
	cpf: string
}

export class CreateCustomer {
	constructor(private readonly customerRepository: CustomerRepository) {}

	async execute(params: Input) {
		const { cpf, email, name } = params
		const customer = Customer.create(name, email, cpf)
		await this.customerRepository.save(customer)
		return customer.toJSON()
	}
}
