import type { CreateCustomer } from '@/application/usecases/customer/create-customer'
import type { FastifyReply, FastifyRequest } from 'fastify'

interface Input {
	name: string
	email: string
	cpf: string
}

export class CustomerController {
	constructor(private readonly createCustomerUseCase: CreateCustomer) {}

	async createCustomer(request: FastifyRequest, reply: FastifyReply) {
		try {
			const input = request.body as Input
			const result = await this.createCustomerUseCase.execute(input)
			return reply.send(result).status(201)
		} catch (error) {
			console.error(error)
			return reply.status(500).send({ message: 'Internal server error' })
		}
	}
}
