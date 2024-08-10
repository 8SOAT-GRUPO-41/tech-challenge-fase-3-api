import type { OrderRepository } from '@/application/ports/order-repository'
import type { Order } from '@/domain/entities'
import type { PostgresDatabaseConnection } from '@/infrastructure/database/postgres-connection'

export class OrderRepositoryPostgres implements OrderRepository {
	constructor(private readonly databaseConnection: PostgresDatabaseConnection) {}

	async findAll(): Promise<Order[]> {
		throw new Error('Method not implemented.')
	}

	async save(order: Order): Promise<void> {
		throw new Error('Method not implemented.')
	}

	async update(order: Order): Promise<void> {
		throw new Error('Method not implemented.')
	}

	async findById(orderId: string): Promise<Order | null> {
		throw new Error('Method not implemented.')
	}
}
