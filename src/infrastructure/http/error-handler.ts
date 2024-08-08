import { NotFoundError } from '@/domain/errors/not-found-error'
import type { FastifyReply, FastifyRequest } from 'fastify'

enum ErrorCodes {
	NOT_FOUND = 'NOT_FOUND',
	INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
}

const createErrorResponse = (code: ErrorCodes, message: string, status: number, reply: FastifyReply): void => {
	reply.status(status).send({
		status: 'error',
		code,
		message
	})
}

const errorHandler = (error: unknown, request: FastifyRequest, reply: FastifyReply): void => {
	request.log.error(error)

	if (error instanceof NotFoundError) {
		createErrorResponse(ErrorCodes.NOT_FOUND, error.message, 404, reply)
		return
	}

	createErrorResponse(
		ErrorCodes.INTERNAL_SERVER_ERROR,
		(error as Error).message || 'Something unexpected happened',
		500,
		reply
	)
}

export default errorHandler
