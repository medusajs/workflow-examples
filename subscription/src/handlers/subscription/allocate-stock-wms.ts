import { StepResponse, createStep } from "@medusajs/workflows";
import Wms from "../../services/wms";
import { Allocation, Order } from "../../types";

export const allocateStockWms = createStep(
  "allocateWms",
  async (order: Order, { container }) => {
    const wmsStock: Wms = container.resolve("wmsService");

    const allocation = await wmsStock.allocateStock(
      order.order_number,
      order.items
    );

    return new StepResponse(allocation);
  },
  async (allocation: Allocation | undefined, { container }) => {
    if (!allocation) {
      console.log("WMS stock has not been allocated. Skipping...");
      return;
    }

    const wmsStock = container.resolve("wmsService");

    console.log("Freeing stock from WMS", allocation.allocation_id);
    await wmsStock.freeStock(allocation.allocation_id);
  }
);
