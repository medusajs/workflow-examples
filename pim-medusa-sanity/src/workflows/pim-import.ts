import { createWorkflow } from "@medusajs/workflows";

import { CreateProductDTO, ProductDTO } from "@medusajs/types";

import { createProductStep } from "./steps/create-product";

type WorkflowInput = {
  productData: CreateProductDTO[];
};

const pimImport = createWorkflow<WorkflowInput, ProductDTO[]>(
  "pimImport",
  function (input) {
    const products = createProductStep(input.productData);

    return products;
  }
);

export default pimImport;
