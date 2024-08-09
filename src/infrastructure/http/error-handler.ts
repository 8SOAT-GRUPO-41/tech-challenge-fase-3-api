import { ConflictError } from '@/domain/errors/conflict-error'
import { InvalidParamError } from '@/domain/errors/invalid-param-error'
import { NotFoundError } from '@/domain/errors/not-found-error'
import type { FastifyReply, FastifyRequest } from 'fastify'

enum ErrorCodes {
	NOT_FOUND = 'NOT_FOUND_ERROR',
	INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
	BAD_REQUEST = 'BAD_REQUEST_ERROR',
	DOMAIN_VALIDATION = 'DOMAIN_VALIDATION_ERROR',
	CONFLICT_ERROR = 'CONFLICT_ERROR',
	DUPLICATE_ENTITY = 'DUPLICATE_ENTITY_ERROR'
}

const createErrorResponse = (code: ErrorCodes, message: string, status: number, reply: FastifyReply): void => {
	reply.status(status).send({
		status: 'error',
		statusCode: status,
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

	if ((error as any).code === 'FST_ERR_VALIDATION') {
		createErrorResponse(ErrorCodes.BAD_REQUEST, (error as any).message || 'Validation error', 400, reply)
		return
	}

	if (error instanceof InvalidParamError) {
		createErrorResponse(ErrorCodes.BAD_REQUEST, error.message, 422, reply)
		return
	}

	if (error instanceof ConflictError) {
		createErrorResponse(ErrorCodes.CONFLICT_ERROR, error.message, 409, reply)
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
