import type { CustomerRepository } from '@/application/ports/customer-repository'
import { Customer } from '@/domain/entities'
import type { PostgresDatabaseConnection } from '../../database/postgres-connection'

export class CustomerRepositoryPostgres implements CustomerRepository {
	constructor(private readonly databaseConnection: PostgresDatabaseConnection) {}

	async save(customer: Customer): Promise<void> {
		const sql = 'INSERT INTO customers (customer_id, name, email, cpf) VALUES ($1, $2, $3, $4)'
		const params = [customer.customerId, customer.getName(), customer.getEmail(), customer.getCpf()]
		await this.databaseConnection.query(sql, params)
	}

	async findByCpf(cpf: string): Promise<Customer | null> {
		const sql = 'SELECT customer_id, name, cpf, email FROM customers WHERE cpf = $1'
		const params = [cpf]
		const result = await this.databaseConnection.query<{
			customer_id: string
			name: string
			cpf: string
			email: string
		}>(sql, params)
		const customerQueryResult = result?.shift()
		if (!customerQueryResult) return null
		return Customer.restore(
			customerQueryResult.customer_id,
			customerQueryResult.name,
			customerQueryResult.email,
			customerQueryResult.cpf
		)
	}
}