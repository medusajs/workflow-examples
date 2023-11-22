import { TransactionBaseService } from "@medusajs/medusa";

const dummyOrders = [
  {
    id: "order_1",
    items: [
      {
        id: "item_1",
        price: 1000,
      },
      {
        id: "item_2",
        price: 2000,
      },
      {
        id: "item_3",
        price: 4000,
      },
    ],
  },
  {
    id: "order_2",
    items: [
      {
        id: "item_4",
        price: 1000,
      },
      {
        id: "item_5",
        price: 2000,
      },
      {
        id: "item_6",
        price: 4000,
      },
    ],
  },
];

export default class ShopService extends TransactionBaseService {
  constructor({}: {}, options: Record<string, unknown>) {
    // @ts-ignore
    super(...arguments);
  }

  async retrieveDailyOrders() {
    return dummyOrders;
  }
}
