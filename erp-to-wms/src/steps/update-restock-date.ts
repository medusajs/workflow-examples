import { IProductModuleService, ProductDTO } from "@medusajs/types";
import { StepResponse, createStep } from "@medusajs/workflows-sdk";

type StepInput = {
  expectedRestockDate: Date;
  products: { id: string; metadata?: Record<string, unknown> }[];
};

type StepOutput = {
  products: ProductDTO[];
};

export const updateExpectedRestockDate = createStep<StepInput, StepOutput, any>(
  "update-expected-restock-date",
  async function ({ expectedRestockDate, products }, context) {
    const productService: IProductModuleService = context.container.resolve(
      "productModuleService"
    );

    const productUpdate = products.map((p) => {
      p.metadata = {
        ...p.metadata,
        expected_restock: expectedRestockDate,
      };
      return p;
    });

    const updatedProducts = await productService.update(productUpdate);

    return new StepResponse({ products: updatedProducts });
  },
  async function ({ products }, context) {
    // Rolling back -> Removing the expected restock date on Products
    console.log("Rolling back expected restock date on Products");
    const productService: IProductModuleService = context.container.resolve(
      "productModuleService"
    );

    const productUpdate = products.map((p) => {
      p.metadata = {
        ...p.metadata,
        expected_restock: null,
      };
      return p;
    });

    await productService.update(productUpdate);
  }
);
