import { Cart, CartService } from "@medusajs/medusa";
import { createStep, StepResponse } from "@medusajs/workflows";

type StepInput = {
  discountedProductIds: string[];
  discountCode: string;
};

/**
 * Retrieve recently active carts that have discounted products
 */
export const retrieveCartsWithDiscountedProductsStep = createStep(
  "retrieveCartsWithDiscountedProductsStep",
  async (input: StepInput, { container, context }) => {
    const cartService: CartService = container.resolve("cartService");

    // TODO: make repo method to get more precise carts
    let carts = await cartService.list(
      // @ts-ignore
      { completed_at: null },
      {
        relations: ["items.variant", "discounts"],
      }
    );

    carts = carts.filter(
      (c) =>
        c.items.filter((i) =>
          input.discountedProductIds.includes(i.variant.product_id)
        ).length
    );

    return new StepResponse(carts as Cart[]);
  }
);
