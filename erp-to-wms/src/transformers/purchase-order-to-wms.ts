import { WmsOrder } from "src/services/wms";

export const transformPoToWMS = ({ purchaseOrder }): WmsOrder => {
  console.log("Transforming Purchase Order to WMS format");
  return {
    metadata: {
      purchase_order_id: purchaseOrder.id,
    },
    order_lines: purchaseOrder.lines.map((l) => l.line_id),
  };
};
