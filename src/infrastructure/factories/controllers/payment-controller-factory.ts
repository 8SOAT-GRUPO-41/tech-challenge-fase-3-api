import { PaymentController } from "@/infrastructure/http/controllers/payment-controller";
import { makeUpdateOrderStatus } from "@/infrastructure/factories/usecases/order";

export const makePaymentController = (): PaymentController => {
  return new PaymentController(makeUpdateOrderStatus());
};
