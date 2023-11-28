import { BaseService } from "medusa-interfaces";
import { Item } from "src/types";

class Order extends BaseService {
  async retrieve(order_number: string) {
    return {
      id: Math.random().toString(36).substring(2),
      order_number,
      items: [
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

  async duplicate(items: Item[]) {
    // fails 10% of the time
    if (Math.random() < 0.1) {
      throw new Error("An error occured while duplicating the original order.");
    }

    return {
      id: Math.floor(Math.random() * 1000),
      order_number: Math.random().toString(36).substring(2),
      items,
      date: Date.now(),
      status: "completed",
    };
  }

  async delete(id?: string) {
    if (!id) {
      console.log(`Order wasn't created.`);
      return;
    }

    console.log(`Deleting order ${id}`);
    return true;
  }
}

export default Order;
