import { createStep, StepResponse } from "@medusajs/workflows";
import { CreateProductDTO, ProductDTO } from "@medusajs/types";

/**
 * Create Medusa product step
 */
export const createProductStep = createStep(
  "createProductStep",
  async (productData: CreateProductDTO[], { container, context }) => {
    const productService = container.resolve("productModuleService");

    const products: ProductDTO[] = await productService.create(productData);
    return new StepResponse(products);
  },
  async (products: ProductDTO[] | undefined, { container, context }) => {
    if (!products) {
      return;
    }
    const productService = container.resolve("productModuleService");
    await productService.delete(products.map((p) => p.id));
  }
);
