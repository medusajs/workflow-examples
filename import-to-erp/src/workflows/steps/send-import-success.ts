import { createStep } from "@medusajs/workflows";

export const sendImportSucceededNotification = createStep(
  "sendImportSucceededNotification",
  async function (_, executionContext) {
    const container = executionContext.container;
    
    const slackService = container.resolve("slackService");

    await slackService.send(
      `Orders successfully imported into ERP`
    );
  }
);
