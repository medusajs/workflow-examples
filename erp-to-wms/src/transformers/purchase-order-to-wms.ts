import { WmsOrder } from "src/services/wms";

export const transformPoToWMS = ({ purchaseOrder }): WmsOrder => {
  return {
    metadata: {
      purchase_order_id: purchaseOrder.id,
    },
    order_lines: purchaseOrder.lines.map((l) => l.line_id),
  };
};
