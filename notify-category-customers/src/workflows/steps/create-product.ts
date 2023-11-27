import { createStep, StepResponse } from "@medusajs/workflows";

import { Product, ProductService } from "@medusajs/medusa";
import { CreateProductInput } from "@medusajs/medusa/dist/types/product";

/**
 * Create Medusa product step
 */
export const createProductStep = createStep(
  "createProductStep",
  async (
    productData: Partial<CreateProductInput>[],
    { container, context }
  ) => {
    const productService: ProductService = container.resolve("productService");
    let products: Product[] = (await Promise.all(
      productData.map((p) =>
        // @ts-ignore
        productService.withTransaction(context.manager).create(p as any)
      )
    )) as unknown as Product[];

    return new StepResponse(
      await productService
        // @ts-ignore
        .withTransaction(context.manager)
        .list({ id: products.map((p) => p.id) }, { relations: ["categories"] })
    );
  },
  async (products: Product[] | undefined, { container, context }) => {
    const productService: ProductService = container
      .resolve("productService")
      .withTransaction(context.manager);

    await Promise.all(products.map((p) => productService.delete(p.id)));
  }
);
