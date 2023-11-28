import { createWorkflow } from "@medusajs/workflows";
import { CreateProductDTO, ProductDTO } from "@medusajs/types";

import { createProductStep } from "./steps/create-product";
import { syncSanityStep } from "./steps/sync-sanity";

type WorkflowInput = {
  productData: CreateProductDTO[];
};

const pimImport = createWorkflow<WorkflowInput, ProductDTO[]>(
  "pimImport",
  function (input) {
    const products = createProductStep(input.productData);

    syncSanityStep(products);

    return products;
  }
);

export default pimImport;
