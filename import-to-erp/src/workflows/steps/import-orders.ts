import { createStep } from "@medusajs/workflows";

export const importOrdersToErp = createStep(
  "importOrdersToErp",
  async function (orders, executionContext) {
    const container = executionContext.container;

    const erpService = container.resolve("erpService");

    await erpService.import(orders);
  }
);