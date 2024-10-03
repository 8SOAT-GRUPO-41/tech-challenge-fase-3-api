import type { RouteHandlerMethod } from 'fastify'
import type { HttpController } from './interfaces/controller'

export const adaptFastifyRoute = (controller: HttpController): RouteHandlerMethod => {
	return async (request, reply) => {
		const httpResponse = await controller.handle({
			body: request.body,
			params: request.params,
			query: request.query
		})
		return reply.status(httpResponse.statusCode).send(httpResponse.body)
	}
}
