import { Cart, CartService } from "@medusajs/medusa";
import pick from "lodash/pick";
import {
  createStep,
  createWorkflow,
  transform,
  StepResponse,
} from "@medusajs/workflows";
import EmailService from "../services/email";

/* ******************** TYPES ******************** */

type NotifyOnDiscountWorkflowInput = {
  discountedProductIds: string[];
  discountCode: string;
};

type NotifyUsersInput = { id: string; email: string }[];

type ApplyDiscountInput = {
  carts: Cart[];
  discountCode: string;
};

/* ******************** STEPS ******************** */

/**
 * Retreieve recently active carts that have discounted products
 */
const retrieveCartsWithDiscountedProductsStep = createStep(
  "retrieveCartsWithDiscountedProductsStep",
  async (input: NotifyOnDiscountWorkflowInput, { container, context }) => {
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

/**
 * Sends email to customers that product in their uncompleted cart is on sale.
 */
const applyDiscountOnCartStep = createStep(
  "applyDiscountOnCartStep",
  async (input: ApplyDiscountInput, { container, context }) => {
    const cartService: CartService = container.resolve("cartService");

    const promises = input.carts.map((cart) =>
      // cartService.applyDiscount(cart, input.discountCode)
      cartService.update(cart.id, { discounts: [{ code: input.discountCode }] })
    );

    await Promise.all(promises);

    return new StepResponse({}, input);
  },
  async (input: ApplyDiscountInput, { container, context }) => {
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

/**
 * Sends email to customers that product in their uncompleted cart is on sale.
 */
const notifyActiveCartCustomersStep = createStep(
  "notifyActiveCartCustomersStep",
  async (input: NotifyUsersInput, { container, context }) => {
    const emailService: EmailService = container.resolve("emailService");

    await emailService.send({
      templateId: "active-cart-product-discount",
      data: input,
    });

    return new StepResponse({});
  }
);

/* ******************** WORKFLOW ******************** */

const notifyOnDiscountWorkflow = createWorkflow<
  NotifyOnDiscountWorkflowInput,
  void
>("notifyOnDiscount", function (input) {
  // 1. fetch recently created carts that contain a product that has been just discounted
  const carts = retrieveCartsWithDiscountedProductsStep(input);

  // 2. apply new discount to the carts
  applyDiscountOnCartStep({
    discountCode: input.discountCode,
    carts,
  });

  // 3. extract data for emailing the customers
  const emailData = transform(carts, (carts) => {
    return carts.map((c) => pick(c, "id", "email"));
  });

  // 4. send an email to customers about discounted offer for the cart
  notifyActiveCartCustomersStep(emailData);
});

export default notifyOnDiscountWorkflow;
