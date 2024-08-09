import { CreateProduct } from '@/application/usecases/product/create-product'
import { makeProductRepository } from '../../repositories/product-repository-factory'

export const makeCreateProduct = (): CreateProduct => {
	return new CreateProduct(makeProductRepository())
}
