import { IProductModuleService, ProductDTO } from "@medusajs/types";
import { StepResponse, createStep } from "@medusajs/workflows-sdk";
import { PurchaseOrder } from "src/services/erp";

type StepInput = {
  purchaseOrder: PurchaseOrder;
};

type StepOutput = {
  products: Pick<ProductDTO, "id" | "metadata">[];
};

export const retrieveProducts = createStep<StepInput, StepOutput, any>(
  "retrieve-products",
  async function ({ purchaseOrder }, context) {
    const prodIds = purchaseOrder.lines.map((p) => p.line_id);
    const productService: IProductModuleService = context.container.resolve(
      "productModuleService"
    );

    const products = await productService.list(
      { id: prodIds },
      { select: ["id", "metadata"] }
    );

    return new StepResponse({ products });
  }
);
