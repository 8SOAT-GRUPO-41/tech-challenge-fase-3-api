import type { HttpRequest, HttpResponse } from './http'

export interface HttpController {
	handle(request: HttpRequest): Promise<HttpResponse>
}
