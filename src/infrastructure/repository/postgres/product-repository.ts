import type { ProductRepository } from '@/application/ports/product-repository'
import type { Product } from '@/domain/entities'
import type { PostgresDatabaseConnection } from '@/infrastructure/database/postgres-connection'

export class ProductRepositoryPostgres implements ProductRepository {
	constructor(private readonly databaseConnection: PostgresDatabaseConnection) {}

	async save(product: Product) {
		const sql = 'INSERT INTO products (product_id, name, price_in_cents, description) VALUES ($1, $2, $3, $4)'
		const params = [product.productId, product.getName(), product.getPriceInCents(), product.getDescription()]
		await this.databaseConnection.query(sql, params)
	}

	async delete(productId: string) {
		const sql = 'DELETE FROM products WHERE product_id = $1'
		const params = [productId]
		await this.databaseConnection.query(sql, params)
	}
}
