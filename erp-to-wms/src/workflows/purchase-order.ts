import {
  createWorkflow,
  parallelize,
  transform,
  createStep
} from "@medusajs/workflows-sdk";

import * as steps from "../steps";
import { transformPoToWMS } from "../transformers/purchase-order-to-wms";

type WorkflowInput = {
  purchaseOrderId: string;
};

export const confirmPurchaseOrder = createWorkflow<WorkflowInput, void>(
  "confirm-purchase-order",
  function (input) {
    const { purchaseOrder } = steps.getPurchaseOrder(input);
    const { products } = steps.retrieveProducts({ purchaseOrder });

    const expectedRestockDate = transform(
      { purchaseOrder },
      ({ purchaseOrder }) => {
        return purchaseOrder.expected_restock;
      }
    );

    const wmsOrder = transform({ purchaseOrder }, transformPoToWMS);

    parallelize(
      steps.updateExpectedRestockDate({ expectedRestockDate, products }),
      steps.createInboundOrder({ wmsOrder })
    );

    /**
     * If you want to see how compensating actions work, uncomment the following workflow step
     * Here, we create a step that throws an error, which will trigger the compensating of all previous steps
     *
     * You should see two logs in the console:
     * - Rolling back inbound order
     * - Rolling back expected restock date on Products
     */

    // createStep("mock-error-step", async function (input: any, context) {
    //   throw new Error("This is meant to be a demonstration of compensating actions");
    // })({});
  }
);
