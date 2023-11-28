import { createWorkflow, WorkflowData, parallelize } from "@medusajs/workflows";
import { transformData } from "./steps/transform-data";
import { addSubscriberToGoogleAds } from "./steps/add-subscriber-to-google-ads";
import { addSubscriberToMetaAds } from "./steps/add-subscriber-to-meta-ads";
import { SyncAudiencesWorkflowData } from "./types";
import { addSubscriberToMailchimp } from "./steps/add-subscriber-to-mailchimp";

type Output = Record<string, any>;

export const addSubscriberToAudiencesWorkflow = createWorkflow<
  SyncAudiencesWorkflowData,
  Output
>("add-subscriber-to-audiences", function (input) {
  // Step 1: Transform data for each audience
  const { mailchimpData, googleData, metaData } = transformData(input);

  // Step 2: Add subscriber to each audience in parallel. If one fails, rollback the others.
  const [mailchimpResult, googleAdsResult, metaResult] = parallelize(
    addSubscriberToMailchimp(mailchimpData),
    addSubscriberToGoogleAds(googleData),
    addSubscriberToMetaAds(metaData)
  );

  // Return the results
  return {
    mailchimpResult,
    googleAdsResult,
    metaResult,
  };
});

export default addSubscriberToAudiencesWorkflow;
