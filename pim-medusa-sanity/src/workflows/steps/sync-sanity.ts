import { createStep, StepResponse } from "@medusajs/workflows";

import { Product } from "@medusajs/medusa";

/**
 * Sync products wth Sanity CMS step
 */
export const syncSanityStep = createStep(
  "syncSanityStep",
  async (products: Product[], { container, context }) => {
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
