import {
  ProductVariant,
  ProductVariantInventoryService,
} from "@medusajs/medusa";
import type { IInventoryService } from "@medusajs/types";
import { promiseAll } from "@medusajs/utils";
import { StepResponse, createStep } from "@medusajs/workflows";
import { EntityManager } from "typeorm";

type CreateInventoryItemsStep = {
  variants: ProductVariant[];
};

export const createInventoryItemsStep = createStep(
  "create-inventory-items-step",
  async function (input: CreateInventoryItemsStep, context) {
    const { variants } = input;
    const {
      container,
      context: { manager },
    } = context;

    const inventoryService = container.resolve<IInventoryService | undefined>(
      "inventoryService"
    );
    const productVariantInventoryServiceTx = container
      .resolve<ProductVariantInventoryService>("productVariantInventoryService")
      .withTransaction(manager as EntityManager);

    const inventoryItemIds: string[] = [];

    if (inventoryService) {
      const inventoryPairs = await promiseAll(
        variants
          .map(async (variant) => {
            if (!variant.manage_inventory) {
              return;
            }

            const inventoryItem = await inventoryService.createInventoryItem(
              {
                sku: variant.sku,
                origin_country: variant.origin_country,
                hs_code: variant.hs_code,
                mid_code: variant.mid_code,
                material: variant.material,
                weight: variant.weight,
                length: variant.length,
                height: variant.height,
                width: variant.width,
              },
              { transactionManager: manager as EntityManager }
            );

            return { variant, inventoryItem };
          })
          .filter(Boolean)
      );

      await promiseAll(
        inventoryPairs.map(async ({ variant, inventoryItem }) => {
          await productVariantInventoryServiceTx.attachInventoryItem(
            variant.id,
            inventoryItem.id
          );
        })
      );

      inventoryItemIds.push(
        ...inventoryPairs.map(({ inventoryItem }) => inventoryItem.id)
      );
    }

    return new StepResponse(void 0, {
      inventoryItemIds,
    });
  },
  async function (input, context) {
    const { inventoryItemIds } = input;
    const {
      container,
      context: { manager },
    } = context;

    const inventoryService = container.resolve<IInventoryService | undefined>(
      "inventoryService"
    );

    if (inventoryService) {
      await promiseAll(
        inventoryItemIds.map((id) =>
          inventoryService.deleteInventoryItem(id, {
            transactionManager: manager as EntityManager,
          })
        )
      );
    }
  }
);
