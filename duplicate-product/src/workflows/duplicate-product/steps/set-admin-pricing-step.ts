import {
  PricingService,
  Product,
  ProductService,
  defaultAdminProductFields,
  defaultAdminProductRelations,
} from "@medusajs/medusa";
import { StepResponse, createStep } from "@medusajs/workflows";
import { EntityManager } from "typeorm";

type SetAdminPricingStepData = {
  product: Product;
};

export const setAdminPricingStep = createStep(
  "set-admin-pricing-step",
  async function (input: SetAdminPricingStepData, context) {
    const { product } = input;
    const {
      container,
      context: { manager },
    } = context;

    const pricingServiceTx = container
      .resolve<PricingService>("pricingService")
      .withTransaction(manager as EntityManager);

    const productServiceTx = container
      .resolve<ProductService>("productService")
      .withTransaction(manager as EntityManager);

    const completeProduct = await productServiceTx.retrieve(product.id, {
      relations: defaultAdminProductRelations,
      select: defaultAdminProductFields,
    });

    const [pricedProduct] = await pricingServiceTx.setAdminProductPricing([
      completeProduct,
    ]);

    return new StepResponse({
      product: pricedProduct as Product,
    });
  }
);
