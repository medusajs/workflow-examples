import { createStep } from "@medusajs/workflows";

export const importOrdersToErpFail = createStep(
  "importOrdersToErp",
  async function (orders, executionContext) {
    throw Error()
  }, async function (input, executionContext) {
    const container = executionContext.container;

    const slackService = container.resolve("slackService");

    await slackService.send(
      `Failed to import orders into ERP`
    );
  }
);
