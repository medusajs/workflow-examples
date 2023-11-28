import { StepResponse, createStep } from "@medusajs/workflows";
import { GoogleAudienceData } from "../types";

export const addSubscriberToGoogleAds = createStep(
  "add-subscriber-to-google-ads",
  async function (input: GoogleAudienceData, context) {
    // Get Google Ads Audience Service
    const googleAdsAudienceService = context.container.resolve(
      "googleAdsAudienceService"
    );

    // Check if audience exists
    const audience = googleAdsAudienceService.retrieve(input.audienceName);

    // If audience does not exist, create it
    if (audience.status !== 200) {
      const createAudience = googleAdsAudienceService.create(
        input.audienceName
      );

      // If audience creation fails, throw error
      if (createAudience.status !== 200) {
        throw new Error(
          "Error while creating audience in Google Ads: " +
            createAudience.message
        );
      }
    }

    // Add subscriber to audience
    const result = googleAdsAudienceService.addSubscriber(input);

    // If adding subscriber fails, throw error
    if (result.status !== 200) {
      throw new Error(
        "Error while adding subscriber to Google Ads: " + result.message
      );
    }

    // Return the result
    return new StepResponse(result);
  },
  async function (result, context) {
    // If workflow error occurs, log it to the console and remove subscriber from audience
    console.log("Error while adding subscriber:", result.message);

    const { id } = result;

    const googleAdsAudienceService = context.container.resolve(
      "googleAdsAudienceService"
    );

    googleAdsAudienceService.removeSubscriber(id);
  }
);
