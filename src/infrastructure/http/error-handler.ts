import type { FastifyReply, FastifyRequest } from 'fastify'
import { HttpStatusCode } from '@/infrastructure/http/helper'
import { DomainError, NotFoundError, InvalidParamError, ConflictError } from '@/domain/errors'

export enum ErrorCodes {
	NOT_FOUND = 'NOT_FOUND_ERROR',
	INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
	BAD_REQUEST = 'BAD_REQUEST_ERROR',
	DOMAIN_ERROR = 'DOMAIN_ERROR',
	CONFLICT_ERROR = 'CONFLICT_ERROR',
	DUPLICATE_ENTITY = 'DUPLICATE_ENTITY_ERROR',
	UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY_ERROR'
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
		createErrorResponse(ErrorCodes.NOT_FOUND, error.message, HttpStatusCode.NOT_FOUND, reply)
		return
	}

	if (error instanceof DomainError) {
		createErrorResponse(ErrorCodes.DOMAIN_ERROR, error.message, HttpStatusCode.UNPROCESSABLE_ENTITY, reply)
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
		createErrorResponse(ErrorCodes.UNPROCESSABLE_ENTITY, error.message, HttpStatusCode.UNPROCESSABLE_ENTITY, reply)
		return
	}

	if (error instanceof ConflictError) {
		createErrorResponse(ErrorCodes.CONFLICT_ERROR, error.message, HttpStatusCode.CONFLICT, reply)
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
