import { StepResponse, createWorkflow, transform } from "@medusajs/workflows";
import { CreateProductInput } from "@medusajs/medusa/dist/types/product";
import { Product } from "@medusajs/medusa";

import { createProductStep } from "./steps/create-product";
import { retrieveCustomersForProductCategory } from "./steps/get-customers-for-product-category";
import { notifyCustomers } from "./steps/notify-customers";

type WorkflowInput = {
  productData: CreateProductInput[];
};

const pimImport = createWorkflow<WorkflowInput, Product[]>(
  "pimImport",
  function (input) {
    const products = createProductStep(input.productData);

    const categoryIds = transform({ products }, ({ products }) =>
      products.flatMap((p) => p.categories.map((c) => c.id))
    );

    const customers = retrieveCustomersForProductCategory(categoryIds);

    notifyCustomers(customers);

    return products;
  }
);

export default pimImport;
