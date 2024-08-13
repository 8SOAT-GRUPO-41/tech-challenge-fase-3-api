import { Order } from '@/domain/entities'
import { customerMock, orderItemMock } from '@/tests/domain/mocks'

export const orderMock = Order.create(customerMock, [orderItemMock])
