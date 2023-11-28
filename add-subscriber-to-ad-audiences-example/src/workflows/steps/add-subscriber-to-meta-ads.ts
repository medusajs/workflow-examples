import { StepResponse, createStep } from "@medusajs/workflows";
import { MetaAudienceData } from "../types";

export const addSubscriberToMetaAds = createStep(
  "add-subscriber-to-meta-ads",
  async function (input: MetaAudienceData, context) {
    // Get Meta Ads Audience Service
    const metaAdsAudienceService = context.container.resolve(
      "metaAdsAudienceService"
    );

    // Check if audience exists
    const audience = metaAdsAudienceService.retrieve(input.audienceName);

    // If audience does not exist, create it
    if (audience.status !== 200) {
      metaAdsAudienceService.create(input.audienceName);

      // If audience creation fails, throw error
      if (audience.status !== 200) {
        throw new Error(
          "Error while creating audience in Meta Ads: " + audience.message
        );
      }
    }

    // Add subscriber to audience
    const result = metaAdsAudienceService.addSubscriber(input);

    // If adding subscriber fails, throw error
    if (result.status !== 200) {
      throw new Error(
        "Error while adding subscriber to Meta Ads: " + result.message
      );
    }

    // Return the result
    return new StepResponse(result);
  },
  async function (result, context) {
    // If workflow error occurs, log it to the console and remove subscriber from audience
    console.log("Error while adding subscriber, rolling back Meta...");

    const { id } = result;

    const metaAdsAudienceService = context.container.resolve(
      "metaAdsAudienceService"
    );

    metaAdsAudienceService.removeSubscriber(id);
  }
);
