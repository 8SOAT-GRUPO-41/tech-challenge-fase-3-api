import type { ProductRepository } from '@/application/ports/product-repository'
import type { Product } from '@/domain/entities'
import type { PostgresDatabaseConnection } from '@/infrastructure/database/postgres-connection'

export class ProductRepositoryPostgres implements ProductRepository {
	constructor(private readonly databaseConnection: PostgresDatabaseConnection) {}

	async save(product: Product) {
		await this.databaseConnection.query(
			'INSERT INTO products (product_id, name, price_in_cents, description) VALUES ($1, $2, $3, $4)',
			[product.productId, product.getName(), product.getPriceInCents(), product.getDescription()]
		)
	}

	async delete(productId: string) {
		await this.databaseConnection.query('DELETE FROM products WHERE product_id = $1', [productId])
	}
}
