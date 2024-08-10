import { UpdateProduct } from '@/application/usecases/product/update-product'
import { makeProductRepository } from '../../repositories/product-repository-factory'

export const makeUpdateProduct = (): UpdateProduct => {
	return new UpdateProduct(makeProductRepository())
}
