import { StepResponse, createStep } from "@medusajs/workflows";
import { SyncAudiencesWorkflowData } from "../types";
import { createHash } from "node:crypto";

/** This step transforms the data from the input to the output data that is used in the next steps. */
export const transformData = createStep(
  "transform-data",
  async function (input: SyncAudiencesWorkflowData) {
    const { audienceName, ...customer } = input;
    const hash = createHash("sha256");
    hash.update(customer.email);
    const hashedEmail = hash.digest("hex");

    const mailchimpData = {
      audienceName,
      id: customer.id,
      email_address: customer.email,
      status: "subscribed",
      merge_fields: {
        FNAME: customer.first_name,
        LNAME: customer.last_name,
      },
    };

    const googleData = {
      audienceName,
      id: customer.id,
      emailAddress: customer.email,
    };

    const metaData = {
      audienceName,
      email: hashedEmail,
    };

    return new StepResponse({
      mailchimpData,
      googleData,
      metaData,
    });
  }
);
