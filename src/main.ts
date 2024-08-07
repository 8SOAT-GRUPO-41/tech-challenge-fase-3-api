import { config } from 'dotenv'
import Fastify from 'fastify'
import { makeCustomerController } from './infrastructure/factories/controllers/customer-controller-factory'
config()

const fastify = Fastify({
	logger: true
})

fastify.post('/customers', makeCustomerController().createCustomer.bind(makeCustomerController()))

fastify.listen({
	port: 3000
})
