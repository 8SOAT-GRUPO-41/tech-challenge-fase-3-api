import { DeleteProduct } from '@/application/usecases/product/delete-product'
import { makeProductRepository } from '../../repositories/product-repository-factory'

export const makeDeleteProduct = (): DeleteProduct => {
	return new DeleteProduct(makeProductRepository())
}
