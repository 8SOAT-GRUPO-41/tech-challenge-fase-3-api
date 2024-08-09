import fastify, { type FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import swaggerConfig from "@/infrastructure/swagger";
import errorHandler from "@/infrastructure/http/error-handler";

import customerRoutes from "@/infrastructure/http/routes/customer-routes";
import productRoutes from "./routes/product-routes";

export class HttpServer {
  private server: FastifyInstance;

  constructor() {
    this.server = fastify({
      logger: {
        transport: {
          target: "pino-pretty",
        },
      },
    });
  }

  private async buildRoutes(): Promise<void> {
    this.server.register(customerRoutes);
    this.server.register(productRoutes);
  }

  private async buildDocs(): Promise<void> {
    await this.server
      .register(fastifySwagger, {
        openapi: swaggerConfig,
      })
      .register(fastifySwaggerUI, {
        routePrefix: "/docs",
        uiConfig: {
          deepLinking: false,
          docExpansion: "list",
        },
      });
  }

  async start(): Promise<void> {
    await this.buildDocs();
    await this.buildRoutes();
    this.server.setErrorHandler(errorHandler);
    this.server.listen({ port: +(process.env.PORT || 3000) });
  }
}
