import { Product } from "@medusajs/medusa";
import { createWorkflow } from "@medusajs/workflows";
import { createInventoryItemsStep } from "./steps/create-inventory-items-step";
import { createProductStep } from "./steps/create-product-step";
import { createVariantsStep } from "./steps/create-variants-step";
import { getOriginalProductStep } from "./steps/get-original-product-step";
import { setAdminPricingStep } from "./steps/set-admin-pricing-step";
import { DuplicateProductWorkflowData } from "./types";

type Output = {
  product: Product;
};

export const duplicateProductWorkflow = createWorkflow<
  DuplicateProductWorkflowData,
  Output
>("duplicate-product-workflow", function (input) {
  const getOriginalProductResult = getOriginalProductStep(input);

  const createProductResult = createProductStep({
    data: input,
    product: getOriginalProductResult.product,
  });

  const createVariantsResult = createVariantsStep({
    originalProduct: getOriginalProductResult.product,
    newProduct: createProductResult.product,
  });

  createInventoryItemsStep({
    variants: createVariantsResult.variants,
  });

  const pricedProductResult = setAdminPricingStep(createProductResult);

  return pricedProductResult;
});
