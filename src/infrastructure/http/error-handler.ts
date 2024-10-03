import type { FastifyReply, FastifyRequest } from 'fastify'
import { HttpStatusCode } from '@/infrastructure/http/helper'
import { DomainError, NotFoundError, InvalidParamError, ConflictError } from '@/domain/errors'
import { ErrorCodes } from '@/domain/enums'

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
		createErrorResponse(error.code, error.message, HttpStatusCode.NOT_FOUND, reply)
		return
	}

	if (error instanceof DomainError) {
		createErrorResponse(error.code, error.message, HttpStatusCode.UNPROCESSABLE_ENTITY, reply)
		return
	}

	if (typeof error === 'object' && (error as { code?: string }).code === 'FST_ERR_VALIDATION') {
		createErrorResponse(
			ErrorCodes.BAD_REQUEST,
			(error as { message?: string }).message || 'Validation error',
			HttpStatusCode.BAD_REQUEST,
			reply
		)
		return
	}

	if (error instanceof InvalidParamError) {
		createErrorResponse(error.code, error.message, HttpStatusCode.UNPROCESSABLE_ENTITY, reply)
		return
	}

	if (error instanceof ConflictError) {
		createErrorResponse(error.code, error.message, HttpStatusCode.CONFLICT, reply)
		return
	}

	createErrorResponse(
		ErrorCodes.INTERNAL_SERVER_ERROR,
		(error as Error).message || 'Something unexpected happened',
		HttpStatusCode.SERVER_ERROR,
		reply
	)
}

export default errorHandler
