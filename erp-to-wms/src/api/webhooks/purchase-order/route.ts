import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { confirmPurchaseOrder } from "../../../workflows/purchase-order";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const workflow = confirmPurchaseOrder(req.scope);

  const { errors } = await workflow.run({
    input: { purchaseOrderId: "po_12345" },
    throwOnError: false,
  });

  if (errors?.length > 0) {
    const errResponse = errors.map((e) => ({
      step: e.action,
      error: e.error.message,
    }));

    res.json(errResponse).status(500);
    return
  }

  res.json({ message: "success" }).status(200);
}
