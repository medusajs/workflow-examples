import { TransactionBaseService } from "@medusajs/medusa";

export type Order = Record<string, unknown>;

export default class ErpService extends TransactionBaseService {
  constructor({}: {}, options: Record<string, unknown>) {
    // @ts-ignore
    super(...arguments);
  }

  async import(orders: Order[]) {
    console.log("Importing Orders");
  }
}
