import type { CustomerRepository } from '@/application/ports/customer-repository'
import { CustomerRepositoryPostgres } from '@/infrastructure/repository/postgres/customer-repository'
import { PostgresDatabaseConnection } from '@/infrastructure/database/postgres-connection'

export const makeCustomerRepository = (): CustomerRepository => {
	return new CustomerRepositoryPostgres(new PostgresDatabaseConnection())
}
