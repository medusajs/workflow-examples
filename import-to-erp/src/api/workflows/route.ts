import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { importOrdersWorkflowFail } from "../../workflows/import-orders";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const workflow = importOrdersWorkflowFail(req.scope);

  try {
    await workflow.run();
  } catch (error) {
    // noop
  }

  res.status(200).send({ message: "ok" });
}
