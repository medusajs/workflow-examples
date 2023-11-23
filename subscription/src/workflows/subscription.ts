import { createWorkflow, parallelize } from "@medusajs/workflows";
import {
  allocateStockMedusa,
  allocateStockWms,
  capturePayment,
  createNewOrder,
  emailUser,
  retrieveOrder,
} from "../handlers";
import { SubscriptionHook } from "../types";

export const subscriptionWorkflow = createWorkflow<SubscriptionHook, void>(
  "subscription",
  function (input) {
    const paymentData = capturePayment(input);

    const order = retrieveOrder(input);

    const items = order.items;
    parallelize(allocateStockWms(order), allocateStockMedusa(items));

    createNewOrder(items);

    emailUser({
      payment: paymentData,
      input,
      order,
    });
  }
);
