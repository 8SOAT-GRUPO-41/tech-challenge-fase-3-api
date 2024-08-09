import { Price } from '@/domain/value-objects'

const PRODUCT_CATEGORIES = ['Lanche', 'Acompanhamento', 'Bebida', 'Sobremesa'] as const

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]

export class Product {
	private constructor(
		readonly productId: string,
		private name: string,
		private category: ProductCategory,
		private price: Price,
		private description: string
	) {}

	static create(name: string, category: ProductCategory, price: number, description: string) {
		const productId = crypto.randomUUID()
		return new Product(productId, name, category, new Price(price), description)
	}

	static restore(productId: string, name: string, category: ProductCategory, price: number, description: string) {
		return new Product(productId, name, category, new Price(price), description)
	}

	setName = (name: string) => {
		this.name = name
	}

	getName = () => this.name

	getCategory = () => this.category

	getPrice = () => this.price.getCentsValue()

	getDescription = () => this.description

	setPrice = (price: number) => {
		this.price = new Price(price)
	}

	setDescription = (description: string) => {
		this.description = description
	}

	setCategory = (category: ProductCategory) => {
		this.category = category
	}
}
