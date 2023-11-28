import { StepResponse, createStep } from "@medusajs/workflows-sdk";
import WmsService, { WmsOrder } from "src/services/wms";

type StepInput = {
  wmsOrder: WmsOrder;
};

type StepOutput = {
  inboundOrder: any;
};

export const createInboundOrder = createStep<StepInput, StepOutput, any>(
  "create-inbound-order",
  async function ({ wmsOrder }, context) {
    const wmsService: WmsService = context.container.resolve("wmsService");

    const inboundOrder = await wmsService.createInboundOrder(wmsOrder);

    return new StepResponse({ inboundOrder });
  },
  async function ({ inboundOrder }, context) {
    // Rolling back -> Remove the inbound order
    console.log("Rolling back inbound order");
    const wmsService: WmsService = context.container.resolve("wmsService");
    await wmsService.deleteInboundOrder(inboundOrder.id);
  }
);
