import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import {
  TransactionHandlerType,
  TransactionState,
} from "@medusajs/orchestration";
import { subscriptionWorkflow } from "../../../workflows/subscription";

type ResponseType = {
  success: boolean;
  errors?: {
    where: string;
    error: string;
  }[];
  reverted?: boolean;
  compensationErrors?: {
    where: string;
    error: string;
  }[];
};

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const wf = subscriptionWorkflow(req.scope);
  const manager = req.scope.resolve("manager");

  const { errors, transaction } = await wf.run({
    input: {
      id: "123",
      order_id: Math.random().toString(36).substring(2),
      email: "user@foo.com",
      shipping_address: "Elm street 13",
      data: {
        payment_transaction_id: Math.random().toString(36).substring(2),
      },
    },
    context: { manager },
    throwOnError: false,
  });

  const resp: ResponseType = {
    success: transaction.getState() === TransactionState.DONE,
  };

  if (errors.length > 0) {
    resp.errors = errors.map((e) => ({
      where: e.action,
      error: e.error.message,
    }));

    resp.reverted = transaction.getState() === TransactionState.REVERTED;

    if (!resp.reverted) {
      const revertErrors = transaction
        .getErrors()
        .filter((e) => e.handlerType === TransactionHandlerType.COMPENSATE);

      resp.compensationErrors = revertErrors.map((e) => ({
        where: e.action,
        error: e.error.message,
      }));
    }
  }

  res.json(resp).status(resp.success ? 200 : 500);
}
