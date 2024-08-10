import { makeProductRepository } from '@/infrastructure/factories/repositories/product-repository-factory'
import { LoadProductsByCategory } from '@/application/usecases/product/load-products-by-category'

export const makeLoadProductsByCategory = (): LoadProductsByCategory => {
	return new LoadProductsByCategory(makeProductRepository())
}
