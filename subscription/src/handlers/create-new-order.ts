import { StepResponse, createStep } from "@medusajs/workflows";
import { Item, Order } from "../types";

export const createNewOrder = createStep(
  "createNewOrder",
  async (items: Item[], { container }) => {
    const orderService = container.resolve("orderService");

    const newOrder = await orderService.duplicate(items);

    return new StepResponse(newOrder);
  },
  async (order: Order | undefined, { container }) => {
    if (!order) {
      console.log("No new order created.");
      return;
    }

    const orderService = container.resolve("orderService");

    await orderService.delete(order.id);
  }
);
