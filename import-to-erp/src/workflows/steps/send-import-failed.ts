import { createStep, StepResponse } from "@medusajs/workflows";

export const sendImportFailedNotification = createStep(
  "sendImportFailedNotification",
  async function (input: { batchNum: string }, _) {
    return new StepResponse(input.batchNum);
  },
  async function (batchNum, executionContext) {
    const container = executionContext.container;

    const slackService = container.resolve("slackService");

    await slackService.send(
      `Order batch ${batchNum} failed to import into ERP`
    );
  }
);
