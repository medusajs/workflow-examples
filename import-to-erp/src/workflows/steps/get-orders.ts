import { createStep, StepResponse } from "@medusajs/workflows";

export const getOrders = createStep("getOrders", async function (_, executionContext) {
  const container = executionContext.container;

  const shopService = container.resolve("shopService");

  const orders = await shopService.retrieveDailyOrders();

  return new StepResponse({
    orders,
  });
});
