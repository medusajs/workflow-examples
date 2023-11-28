import { Cart, CartService } from "@medusajs/medusa";
import { createStep, StepResponse } from "@medusajs/workflows";

type StepInput = {
  carts: Cart[];
  discountCode: string;
};

/**
 * Sends email to customers that product in their uncompleted cart is on sale.
 */
export const applyDiscountOnCartStep = createStep(
  "applyDiscountOnCartStep",
  async (input: StepInput, { container, context }) => {
    const cartService: CartService = container.resolve("cartService");

    const promises = input.carts.map((cart) =>
      // cartService.applyDiscount(cart, input.discountCode)
      cartService.update(cart.id, { discounts: [{ code: input.discountCode }] })
    );

    await Promise.all(promises);

    return new StepResponse({}, input);
  },
  async (input: StepInput, { container, context }) => {
    const cartService: CartService = container.resolve("cartService");

    const promises = input.carts.map((cart) =>
      // cartService.removeDiscount(cart.id, input.discountCode)
      cartService.update(cart.id, {
        discounts: cart.discounts.filter((d) => d.code !== input.discountCode),
      })
    );

    await Promise.all(promises);
  }
);
