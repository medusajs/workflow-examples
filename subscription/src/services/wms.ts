import { BaseService } from "medusa-interfaces";
import { Allocation, Item } from "../types";

class Wms extends BaseService {
  async allocateStock(
    order_number: string,
    items: Item[]
  ): Promise<Allocation> {
    // fails 20% of the time
    if (Math.random() < 0.2) {
      throw new Error("WMS allocation failed. Not enough stock.");
    }

    return {
      allocation_id: "wms_aloc_" + Math.random().toString(36).substring(2),
      order_number: order_number ?? "AE123F98",
      items: items ?? [
        {
          id: 123,
          name: "Test Product",
          quantity: 2,
        },
        {
          id: 456,
          name: "Test Product 2",
          quantity: 4,
        },
      ],
      date: Date.now(),
      status: "completed",
    };
  }
  async freeStock(allocation_id: string): Promise<boolean> {
    return true;
  }
}

export default Wms;
