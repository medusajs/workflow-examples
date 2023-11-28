import { StepResponse, createStep } from "@medusajs/workflows-sdk";
import ErpService, { PurchaseOrder } from "src/services/erp";

type StepInput = {
  purchaseOrderId: string;
};

type StepOutput = {
  purchaseOrder: PurchaseOrder;
};

export const getPurchaseOrder = createStep<StepInput, StepOutput, any>(
  "get-purchase-order",
  async function ({ purchaseOrderId }, context) {
    console.log("Running step `get-purchase-order`")
    const erpService: ErpService = context.container.resolve("erpService");

    const purchaseOrder = await erpService.getPurchaseOrder(purchaseOrderId);

    return new StepResponse({ purchaseOrder });
  }
);
