import { ProductController } from '@/infrastructure/http/controllers/product-controller'
import {
	makeCreateProduct,
	makeDeleteProduct,
	makeUpdateProduct,
	makeLoadProductsByCategory
} from '@/infrastructure/factories/usecases/product'

export const makeProductController = (): ProductController => {
	return new ProductController(
		makeCreateProduct(),
		makeDeleteProduct(),
		makeUpdateProduct(),
		makeLoadProductsByCategory()
	)
}
