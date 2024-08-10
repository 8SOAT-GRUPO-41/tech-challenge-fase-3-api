import { ProductController } from '@/infrastructure/http/controllers/product-controller'
import { makeCreateProduct } from '../usecases/product/create-product-factory'
import { makeDeleteProduct } from '../usecases/product/delete-product-factory'
import { makeUpdateProduct } from '../usecases/product/update-product-factory'
import { makeLoadProductsByCategory } from '../usecases/product/load-products-by-category'

export const makeProductController = (): ProductController => {
	return new ProductController(
		makeCreateProduct(),
		makeDeleteProduct(),
		makeUpdateProduct(),
		makeLoadProductsByCategory()
	)
}
