import type { Customer } from '@/domain/entities'

export interface CustomerRepository {
	save(customer: Customer): Promise<void>
}
