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
          line_id: "prod_01HG94VWBT0D9TZXEQFB86H8RN",
        },
        {
          line_id: "prod_01HG94VTHMBABHJYYDMS5TNQWM",
        },
        {
          line_id: "prod_01HG94VS9YTVDVH0DZ5Z8PPPHS",
        },
      ],
    });
  }

  async createInboundOrder(purchaseOrder: PurchaseOrder): Promise<string> {
    return Promise.resolve("success");
  }
}
