import {
  Product,
  ProductVariant,
  ProductVariantService,
} from "@medusajs/medusa";
import { CreateProductVariantInput } from "@medusajs/medusa/dist/types/product-variant";
import { promiseAll } from "@medusajs/utils";
import { StepResponse, createStep } from "@medusajs/workflows";
import omit from "lodash/omit";
import { EntityManager } from "typeorm";

type CreateVariantsStepData = {
  originalProduct: Product;
  newProduct: Product;
};

type CreateVariantsStepReturnData = {
  variants: ProductVariant[];
};

export const createVariantsStep = createStep(
  "create-variants-step",
  async function (input: CreateVariantsStepData, context) {
    const newProduct = input.newProduct;
    const originalProduct = input.originalProduct;
    const {
      container,
      context: { manager },
    } = context;

    const productVariantServiceTx = container
      .resolve<ProductVariantService>("productVariantService")
      .withTransaction(manager as EntityManager);

    const variantsInput: CreateProductVariantInput[] =
      originalProduct.variants.map((v) => {
        const variantInput = omit(v, [
          "id",
          "prices",
          "options",
          "sku",
          "ean",
          "barcode",
          "upc",
          "product",
          "product_id",
        ]);

        const optionsInput = v.options.map((o) => {
          const originalOption = originalProduct.options.find(
            (no) => no.id === o.option_id
          );

          const newOption = newProduct.options.find(
            (no) => no.title === originalOption.title
          );

          return {
            option_id: newOption.id,
            value: o.value,
          };
        });

        const pricesInput = v.prices.map((p) => {
          if (p.region_id) {
            return {
              region_id: p.region_id,
              amount: p.amount,
            };
          }

          return {
            amount: p.amount,
            currency_code: p.currency_code,
          };
        });

        return {
          ...variantInput,
          options: optionsInput,
          prices: pricesInput,
        };
      });

    console.log(">>> variantsInput", JSON.stringify(variantsInput, null, 2));
    console.log(
      ">>> newProduct.variants",
      JSON.stringify(newProduct.variants, null, 2)
    );

    const result = (await productVariantServiceTx.create<
      CreateProductVariantInput[]
    >(newProduct.id, variantsInput)) as unknown as ProductVariant[];

    return new StepResponse({
      variants: result,
    });
  },
  async function (input, context) {
    const { variants } = input;
    const {
      container,
      context: { manager },
    } = context;

    const productVariantServiceTx = container
      .resolve<ProductVariantService>("productVariantService")
      .withTransaction(manager as EntityManager);

    await promiseAll(variants.map((v) => productVariantServiceTx.delete(v.id)));
  }
);
