import {
	CreateProductController,
	DeleteProductController,
	LoadProductsByCategoryController,
	UpdateProductController
} from '@/infrastructure/controllers/product-controller'
import {
	makeCreateProduct,
	makeDeleteProduct,
	makeUpdateProduct,
	makeLoadProductsByCategory
} from '@/infrastructure/factories/usecases/product'
import type { HttpController } from '@/infrastructure/http/interfaces/controller'

export const makeCreateProductController = (): HttpController => {
	return new CreateProductController(makeCreateProduct())
}

export const makeDeleteProductController = (): HttpController => {
	return new DeleteProductController(makeDeleteProduct())
}

export const makeUpdateProductController = (): HttpController => {
	return new UpdateProductController(makeUpdateProduct())
}

export const makeLoadProductsByCategoryController = (): HttpController => {
	return new LoadProductsByCategoryController(makeLoadProductsByCategory())
}
