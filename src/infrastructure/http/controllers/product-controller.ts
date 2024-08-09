import { CreateProduct } from "@/application/usecases/product/create-product";
import { DeleteProduct } from "@/application/usecases/product/delete-product";
import { ProductCategory } from "@/domain/enums";
import { FastifyReply, FastifyRequest } from "fastify";
import { HttpStatusCode } from "../helper";

interface CreateProductInput {
  name: string;
  price: number;
  description: string;
  category: ProductCategory;
}

export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProduct,
    private readonly deleteProductUseCase: DeleteProduct
  ) {}

  async createProduct(request: FastifyRequest, reply: FastifyReply) {
    const input = request.body as CreateProductInput;
    const result = await this.createProductUseCase.execute(input);
    return reply.send(result.toJSON()).status(HttpStatusCode.CREATED);
  }

  async deleteProduct(request: FastifyRequest, reply: FastifyReply) {
    const input = request.params as { id: string };
    await this.deleteProductUseCase.execute(input.id);
    return reply.send().status(HttpStatusCode.NO_CONTENT);
  }
}
