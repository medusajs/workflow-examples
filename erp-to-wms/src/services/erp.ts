import { TransactionBaseService } from "@medusajs/medusa";

export type PurchaseOrder = {
  id: string;
  lines: Array<{
    line_id: string;
  }>;
  expected_restock: Date;
};

export default class ErpService extends TransactionBaseService {
  constructor({}: {}, options: Record<string, unknown>) {
    // @ts-ignore
    super(...arguments);
  }

  async getPurchaseOrder(poId: string): Promise<PurchaseOrder> {
    return Promise.resolve({
      id: poId,
      expected_restock: new Date(),
      lines: [
        {
          line_id: "prod_123456789",
        },
        {
          line_id: "prod_987654321",
        },
      ],
    });
  }

  async createInboundOrder(purchaseOrder: PurchaseOrder): Promise<string> {
    return Promise.resolve("success");
  }
}
