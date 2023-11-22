import { ScheduledJobArgs, ScheduledJobConfig } from "@medusajs/medusa";

import { importOrdersWorkflow } from "../workflows/import-orders";

export default async function myCustomJob({ container }: ScheduledJobArgs) {
  const workflow = importOrdersWorkflow(container);

  await workflow.run();
}

export const config: ScheduledJobConfig = {
  name: "daily-order-import",
  schedule: "0 0 * * *", // Every day at midnight
};
