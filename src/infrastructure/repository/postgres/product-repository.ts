import type { ProductRepository } from '@/application/ports/product-repository'
import { Product } from '@/domain/entities'
import type { ProductCategory } from '@/domain/enums'
import type { PostgresDatabaseConnection } from '@/infrastructure/database/postgres-connection'

export class ProductRepositoryPostgres implements ProductRepository {
	constructor(private readonly databaseConnection: PostgresDatabaseConnection) {}

	async save(product: Product) {
		const sql = 'INSERT INTO products (product_id, name, price_in_cents, description, category) VALUES ($1, $2, $3, $4, $5)'
		const params = [product.productId, product.getName(), product.getPriceInCents(), product.getDescription(), product.getCategory()]
		await this.databaseConnection.query(sql, params)
	}

	async delete(productId: string) {
		const sql = 'DELETE FROM products WHERE product_id = $1'
		const params = [productId]
		await this.databaseConnection.query(sql, params)
	}

	async findById(id: string): Promise<Product | null> {
		const sql = 'SELECT * FROM products WHERE product_id = $1'
		const params = [id]
		const result = await this.databaseConnection.query<{
			product_id: string
			name: string
			category: ProductCategory
			price_in_cents: number
			description: string
		}>(sql, params)
		const record = result.shift()
		if (!record) return null
		return Product.restore(record.product_id, record.name, record.category, record.price_in_cents, record.description)
	}

	async update(product: Product) {
		const sql =
			'UPDATE products SET name = $1, price_in_cents = $2, description = $3, category = $4 WHERE product_id = $5'
		const params = [
			product.getName(),
			product.getPriceInCents(),
			product.getDescription(),
			product.getCategory(),
			product.productId
		]
		await this.databaseConnection.query(sql, params)
	}
}
