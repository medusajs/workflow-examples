import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import addSubscriberToAudiencesWorkflow from "../../../workflows";
import customer from "./mock-data.json";
import { SyncAudiencesWorkflowData } from "src/workflows/types";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { audience: audienceName } = req.params;
  // const { customer } = req.body;

  const input = {
    audienceName,
    ...customer,
  } as unknown as SyncAudiencesWorkflowData;

  try {
    const { result } = await addSubscriberToAudiencesWorkflow(req.scope).run({
      input,
    });

    res.send(result);
  } catch (error) {
    console.log({ error });
    res.send({ error });
  }
}
