import { Customer } from "@medusajs/medusa";
import { createStep, StepResponse } from "@medusajs/workflows";

import EmailService from "../../services/email";

/**
 * Sends email to customers that a new product has been added to a category they often purchase from
 */
export const notifyCustomers = createStep(
  "notifyCustomers",
  async (customers: Customer[], { container, context }) => {
    const emailService: EmailService = container.resolve("emailService");

    await emailService.send({
      templateId: "new-product-in-category",
      data: customers.map((c) => ({ email: c.email })),
    });

    return new StepResponse({});
  }
);
