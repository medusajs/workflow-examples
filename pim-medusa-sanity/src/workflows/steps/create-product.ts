import { createStep, StepResponse } from "@medusajs/workflows";

import { initialize as ProductModuleInitialize } from "@medusajs/product";
import { CreateProductDTO, ProductDTO } from "@medusajs/types";

/**
 * Create Medusa product step
 */
export const createProductStep = createStep(
  "createProductStep",
  async (productData: CreateProductDTO[], { container, context }) => {
    const productService = await ProductModuleInitialize({
      database: {
        clientUrl: "postgres://localhost/medusa-store-product",
      },
    });

    const products = await productService.create(productData);

    return new StepResponse(products);
  },
  async (prodcuts: ProductDTO[] | undefined, { container, context }) => {
    const productService = await ProductModuleInitialize({
      database: {
        clientUrl: "postgres://localhost/medusa-store-product",
      },
    });

    const product = productService.delete(prodcuts.map((p) => p.id));

    return new StepResponse(product);
  }
);
