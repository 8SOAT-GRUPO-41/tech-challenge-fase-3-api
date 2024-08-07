import type { OpenAPIV3 } from 'openapi-types'

const swaggerConfig: Omit<OpenAPIV3.Document, 'paths'> = {
	openapi: '3.0.0',
	info: {
		title: 'Raffy API',
		description: 'Raffy API Documentation',
		version: '0.1.0',
		contact: {
			name: 'Raffy',
			email: 'rafavcav@gmail.com'
		}
	},
	servers: [
		{
			url: 'http://localhost:3000',
			description: 'Development server'
		}
	],
	tags: [
		{ name: 'Customers', description: 'Customers related end-points' },
		{ name: 'Products', description: 'Products related end-points' },
		{ name: 'Orders', description: 'Orders related end-points' }
	]
}

export default swaggerConfig
