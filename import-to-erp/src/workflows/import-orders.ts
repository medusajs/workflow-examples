import { createWorkflow } from "@medusajs/workflows";
import * as steps from "./steps";

type WorkflowInput = any;

export const importOrdersWorkflow = createWorkflow<WorkflowInput, void>(
  "workflow",
  function (_) {
    /** Get Order from Shop */
    const orderBatch = steps.getOrders({});
    /** In case the import fails, we have a compensate action to send a failed import notification */
    steps.sendImportFailedNotification({ batchNum: orderBatch.batchNum });
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
    /** In case the import fails, we have a compensate action to send a failed import notification */
    steps.sendImportFailedNotification({ batchNum: orderBatch.batchNum });
    /** Fail to import Orders into ERP */
    steps.importOrdersToErpFail(orderBatch.orders);
    /** Send import successfull */
    steps.sendImportSucceededNotification({ batchNum: orderBatch.batchNum });
  }
);
