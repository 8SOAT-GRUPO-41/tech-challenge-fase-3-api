import { ProductController } from "@/infrastructure/http/controllers/product-controller";
import { makeCreateProduct } from "../usecases/create-product-factory";
import { makeDeleteProduct } from "../usecases/delete-product-factory";

export const makeProductController = (): ProductController => {
  return new ProductController(makeCreateProduct(), makeDeleteProduct());
};
