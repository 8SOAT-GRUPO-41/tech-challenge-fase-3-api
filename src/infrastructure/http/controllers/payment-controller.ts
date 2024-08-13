import type { FastifyReply, FastifyRequest } from "fastify";
import { HttpStatusCode } from "@/infrastructure/http/helper";
import { OrderStatus } from "@/domain/enums";
import { UpdateOrderStatus } from "@/application/usecases/order";

interface FakeCheckoutInput {
  orderId: string;
  status: OrderStatus;
}

export class PaymentController {
  constructor(private readonly updateOrderUseCase: UpdateOrderStatus) {}

  async fakeCheckout(request: FastifyRequest, reply: FastifyReply) {
    const input = request.body as FakeCheckoutInput;
    const result = await this.updateOrderUseCase.execute(input);
    return reply.status(HttpStatusCode.OK).send(result.toJSON());
  }
}
