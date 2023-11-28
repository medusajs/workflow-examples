import { createStep, StepResponse } from "@medusajs/workflows";

import { ProductDTO } from "@medusajs/types";

/**
 * Sync products wth Sanity CMS step
 */
export const syncSanityStep = createStep(
  "syncSanityStep",
  async (products: ProductDTO[], { container, context }) => {
    const sanityService = container.resolve("sanityService");

    const ids = await sanityService.createProducts(products);

    return new StepResponse(ids);
  },
  async (ids: string[] | undefined, { container, context }) => {
    if (!ids) {
      return;
    }
    const sanityService = container.resolve("sanityService");
    await sanityService.deleteProducts(ids);

    return new StepResponse(ids);
  }
);
