import fastify, { type FastifyInstance } from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import swaggerConfig from '@/infrastructure/swagger'

export class HttpServer {
	private server: FastifyInstance

	constructor() {
		this.server = fastify({
			logger: {
				transport: {
					target: 'pino-pretty'
				}
			}
		})
	}

	private async buildRoutes(): Promise<void> {
		this.server.register(import('@/infrastructure/http/routes/customer-routes'))
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
		this.server.listen({ port: +(process.env.PORT || 3000) })
	}
}
