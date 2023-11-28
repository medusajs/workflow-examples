import { TransactionBaseService } from "@medusajs/medusa";

export type WmsOrder = {
  metadata: {
    purchase_order_id: string;
  };
  order_lines: string[];
};

export default class WmsService extends TransactionBaseService {
  constructor({}: {}, options: Record<string, unknown>) {
    // @ts-ignore
    super(...arguments);
  }

  async createInboundOrder(wmsOrder: WmsOrder): Promise<string> {
    return Promise.resolve("success");
  }

  async deleteInboundOrder(wmsOrderId: string): Promise<string> {
    return Promise.resolve("success");
  }
}
