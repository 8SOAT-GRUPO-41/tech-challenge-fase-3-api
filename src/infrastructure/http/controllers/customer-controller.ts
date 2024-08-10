import type { CreateCustomer } from '@/application/usecases/customer/create-customer'
import type { LoadCustomerByCpf } from '@/application/usecases/customer/load-customer-by-cpf'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { HttpStatusCode } from '../helper'

interface CreateCustomerInput {
	name: string
	email: string
	cpf: string
}

export class CustomerController {
	constructor(
		private readonly createCustomerUseCase: CreateCustomer,
		private readonly loadCustomerByCpfUseCase: LoadCustomerByCpf
	) {}

	async createCustomer(request: FastifyRequest, reply: FastifyReply) {
		const input = request.body as CreateCustomerInput
		const result = await this.createCustomerUseCase.execute(input)
		return reply.status(HttpStatusCode.CREATED).send(result.toJSON())
	}

	async loadCustomerByCpf(request: FastifyRequest, reply: FastifyReply) {
		const params = request.params as { cpf: string }
		const result = await this.loadCustomerByCpfUseCase.execute(params.cpf)
		return reply.status(HttpStatusCode.OK).send(result.toJSON())
	}
}
