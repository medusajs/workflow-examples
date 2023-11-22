import { createStep } from "@medusajs/workflows";

export const sendImportSucceededNotification = createStep(
  "sendImportSucceededNotification",
  async function (input: { batchNum: string }, executionContext) {
    const container = executionContext.container;

    const slackService = container.resolve("slackService");

    await slackService.send(
      `Order batch ${input.batchNum} successfully imported into ERP`
    );
  }
);
