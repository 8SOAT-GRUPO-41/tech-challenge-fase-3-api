import type { CustomerRepository } from '@/application/ports/customer-repository'
import { CustomerRepositoryDatabase } from '@/infrastructure/repository/customer-repository'
import { PostgresDatabaseConnection } from '@/infrastructure/database/postgres-connection'

export const makeCustomerRepository = (): CustomerRepository => {
	return new CustomerRepositoryDatabase(new PostgresDatabaseConnection())
}
