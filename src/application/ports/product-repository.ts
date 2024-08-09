import type { Product } from '@/domain/entities'

export interface ProductRepository {
	save(product: Product): Promise<void>
}
