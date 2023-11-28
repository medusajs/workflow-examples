import { createStep, StepResponse } from "@medusajs/workflows";
import { Order, PaymentData, SubscriptionHook } from "../../types";

export const emailUser = createStep(
  "emailUser",
  async (
    {
      payment,
      input,
      order,
    }: {
      payment: PaymentData;
      input: SubscriptionHook;
      order: Order;
    },
    { container }
  ) => {
    const email = container.resolve("emailService");
    const userService = container.resolve("userService");
    const user = await userService.retrieveByEmail(input.email);

    const res = await email.send({
      payment,
      user,
      order,
    });

    return new StepResponse({
      success: res as boolean,
    });
  }
);
