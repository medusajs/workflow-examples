import { StepResponse, createStep } from "@medusajs/workflows";
import { Allocation, Item } from "src/types";

export const allocateStockMedusa = createStep(
  "allocateMedusa",
  async (items: Item[], { container }) => {
    const medusaStock = container.resolve("inventoryService");

    const allocation = await medusaStock.allocateStock(items);

    return new StepResponse(allocation);
  },
  async (allocation: Allocation | undefined, { container }) => {
    if (!allocation) {
      console.log("Medusa stock has not been allocated. Skipping...");
      return;
    }

    const medusaStock = container.resolve("inventoryService");
    console.log("Freeing stock from MEDUSA", allocation.allocation_id);
    await medusaStock.freeStock(allocation.allocation_id);
  }
);
