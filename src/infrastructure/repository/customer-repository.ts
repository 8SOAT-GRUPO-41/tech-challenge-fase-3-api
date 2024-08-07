import type { CustomerRepository } from '@/application/ports/customer-repository'
import type { Customer } from '@/domain/entities'
import type { PostgresDatabaseConnection } from '../database/postgres-connection'

export class CustomerRepositoryDatabase implements CustomerRepository {
	constructor(private readonly databaseConnection: PostgresDatabaseConnection) {}

	async save(customer: Customer): Promise<void> {
		const sql = 'INSERT INTO customers (customer_id, name, email, cpf) VALUES ($1, $2, $3, $4)'
		const params = [customer.customerId, customer.getName(), customer.getEmail(), customer.getCpf()]
		await this.databaseConnection.query(sql, params)
	}
}
