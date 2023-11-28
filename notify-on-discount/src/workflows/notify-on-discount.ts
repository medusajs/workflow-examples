import pick from "lodash/pick";
import { createWorkflow, transform } from "@medusajs/workflows";

import { applyDiscountOnCartStep } from "./steps/apply-discount-on-cart-step";
import { notifyActiveCartCustomersStep } from "./steps/notify-active-cart-customers";
import { retrieveCartsWithDiscountedProductsStep } from "./steps/retrieve-carts-with-discounted-products-step";

type WorkflowInput = {
  discountedProductIds: string[];
  discountCode: string;
};

const notifyOnDiscountWorkflow = createWorkflow<WorkflowInput, void>(
  "notifyOnDiscount",
  function (input) {
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
  }
);

export default notifyOnDiscountWorkflow;
