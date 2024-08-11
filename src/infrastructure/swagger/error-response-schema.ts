import type { ErrorCodes } from '@/infrastructure/http/error-handler'

export const errorResponseSchema = (statusCode: number, errorCode?: ErrorCodes) => ({
	type: 'object',
	properties: {
		status: {
			type: 'string',
			example: 'error'
		},
		statusCode: {
			type: 'number',
			example: statusCode
		},
		code: {
			type: 'string',
			example: errorCode
		},
		message: {
			type: 'string'
		}
	}
})