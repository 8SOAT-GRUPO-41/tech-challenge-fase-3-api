import { PostgresDatabaseConnection } from '@/infrastructure/database/postgres-connection'
import type { OrderRepository } from '@/application/ports/order-repository'
import { OrderRepositoryPostgres } from '@/infrastructure/repository/postgres/order-repository'

export const makeOrderRepository = (): OrderRepository => {
	return new OrderRepositoryPostgres(new PostgresDatabaseConnection())
}
