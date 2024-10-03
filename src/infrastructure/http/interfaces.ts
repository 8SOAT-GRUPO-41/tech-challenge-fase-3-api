export interface HttpResponse<T = unknown> {
	statusCode: number
	body: T
}

export interface HttpRequest<B = unknown, Q = unknown, P = unknown> {
	body: B
	query: Q
	params: P
	headers?: Record<string, unknown>
}

export interface HttpController {
	handle(request: HttpRequest): Promise<HttpResponse>
}
