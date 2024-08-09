import { PostgresDatabaseConnection } from "@/infrastructure/database/postgres-connection";
import { ProductRepository } from "@/application/ports/product-repository";
import { ProductRepositoryPostgres } from "@/infrastructure/repository/postgres/product-repository";

export const makeProductRepository = (): ProductRepository => {
  return new ProductRepositoryPostgres(new PostgresDatabaseConnection());
};
