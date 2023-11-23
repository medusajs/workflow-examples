import { StepResponse, createStep } from "@medusajs/workflows";
import { PaymentData, SubscriptionHook } from "../types";

export const capturePayment = createStep(
  "capturePayment",
  async (input: SubscriptionHook, { container }) => {
    // Stripe already has captured the payment
    return new StepResponse(input.data);
  },
  async (payment: PaymentData, { container }) => {
    const paymentService = container.resolve("paymentService");

    await paymentService.refundPayment(payment.payment_transaction_id);
  }
);
