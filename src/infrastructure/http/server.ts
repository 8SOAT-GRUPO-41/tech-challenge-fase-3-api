import fastify, { type FastifyInstance } from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import swaggerConfig from '@/infrastructure/swagger/swagger-config'
import errorHandler from '@/infrastructure/http/error-handler'
import { customerRoutes, orderRoutes, productRoutes } from '@/infrastructure/http/routes'

export class HttpServer {
	private server: FastifyInstance

	constructor() {
		this.server = fastify({
			logger: true
		})
	}

	private async buildRoutes(): Promise<void> {
		this.server.register(customerRoutes, { prefix: '/customers' })
		this.server.register(productRoutes, { prefix: '/products' })
		this.server.register(orderRoutes, { prefix: '/orders' })
	}

	private async buildDocs(): Promise<void> {
		await this.server
			.register(fastifySwagger, {
				openapi: swaggerConfig
			})
			.register(fastifySwaggerUI, {
				routePrefix: '/docs',
				uiConfig: {
					deepLinking: false,
					docExpansion: 'list'
				}
			})
	}

	async start(): Promise<void> {
		await this.buildDocs()
		await this.buildRoutes()
		this.server.setErrorHandler(errorHandler)
		await this.server.ready()
		this.server.listen({ port: +(process.env.PORT || 3000), host: '0.0.0.0' })
	}
}
