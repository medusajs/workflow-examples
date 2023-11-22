import { TransactionBaseService } from "@medusajs/medusa";

export default class ShopService extends TransactionBaseService {
  constructor({}: {}, options: Record<string, unknown>) {
    // @ts-ignore
    super(...arguments);
  }

  async send(message: string) {
    console.log(`Message: ${message}`);
  }
}
