import { createStep, StepResponse } from "@medusajs/workflows";

import EmailService from "../../services/email";

type StepInput = { id: string; email: string }[];

/**
 * Sends email to customers that product in their uncompleted cart is on sale.
 */
export const notifyActiveCartCustomersStep = createStep(
  "notifyActiveCartCustomersStep",
  async (input: StepInput, { container, context }) => {
    const emailService: EmailService = container.resolve("emailService");

    await emailService.send({
      templateId: "active-cart-product-discount",
      data: input,
    });

    return new StepResponse({});
  }
);
