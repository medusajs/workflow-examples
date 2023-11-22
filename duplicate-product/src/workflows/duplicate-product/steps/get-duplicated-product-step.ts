import {
  ProductService,
  defaultAdminProductFields,
  defaultAdminProductRelations,
} from "@medusajs/medusa";
import { StepResponse, createStep } from "@medusajs/workflows";
import { EntityManager } from "typeorm";

type GetDuplicatedProductStep = {
  id: string;
};

export const getOriginalProductStep = createStep(
  "get-original-product-step",
  async function (input: GetDuplicatedProductStep, context) {
    const { id } = input;
    const {
      container,
      context: { manager },
    } = context;

    const productServiceTx = container
      .resolve<ProductService>("productService")
      .withTransaction(manager as EntityManager);

    const product = await productServiceTx.retrieve(id, {
      relations: defaultAdminProductRelations,
      select: defaultAdminProductFields,
    });

    return new StepResponse({
      product: product,
    });
  }
);
