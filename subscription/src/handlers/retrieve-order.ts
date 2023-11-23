import { StepResponse, createStep } from "@medusajs/workflows";
import { Order, SubscriptionHook } from "../types";

export const retrieveOrder = createStep(
  "retrieveOrder",
  async (input: SubscriptionHook, { container }) => {
    const orderService = container.resolve("orderService");
    return new StepResponse(orderService.retrieve(input.order_id) as Order);
  }
);
