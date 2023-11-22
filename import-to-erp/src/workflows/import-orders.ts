import { createWorkflow } from "@medusajs/workflows";
import * as steps from "./steps";

type WorkflowInput = any;

export const importOrdersWorkflow = createWorkflow<WorkflowInput, void>(
  "workflow",
  function (_) {
    /** Get Order from Shop */
    const orderBatch = steps.getOrders({});
    /** Import Orders into ERP */
    steps.importOrdersToErp(orderBatch.orders);
    /** Send import successfull */
    steps.sendImportSucceededNotification({ batchNum: orderBatch.batchNum });
  }
);

export const importOrdersWorkflowFail = createWorkflow<WorkflowInput, void>(
  "workflow",
  function (_) {
    /** Get Order from Shop */
    const orderBatch = steps.getOrders({});
    /** Fail to import Orders into ERP */
    steps.importOrdersToErpFail(orderBatch.orders);
    /** Send import successfull */
    steps.sendImportSucceededNotification({ batchNum: orderBatch.batchNum });
  }
);
