import { ProductService } from "@medusajs/medusa";
import { StepResponse, createStep } from "@medusajs/workflows";
import { EntityManager } from "typeorm";
import { DuplicateProductWorkflowData } from "../types";

export const getOriginalProductStep = createStep(
  "get-original-product-step",
  async function (input: DuplicateProductWorkflowData, context) {
    const id = input.id;
    const container = context.container;
    const manager = context.context.manager;

    const productServiceTx = container
      .resolve<ProductService>("productService")
      .withTransaction(manager as EntityManager);

    const product = await productServiceTx.retrieve(id, {
      relations: [
        "variants",
        "variants.prices",
        "variants.options",
        "images",
        "options",
        "options.values",
        "sales_channels",
        "categories",
      ],
    });

    return new StepResponse({
      product: product,
    });
  }
);
