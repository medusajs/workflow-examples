import { StepResponse, createStep } from "@medusajs/workflows";
import { MailchimpAudienceData } from "../types";

export const addSubscriberToMailchimp = createStep(
  "add-subscriber-to-mailchimp",
  async function (input: MailchimpAudienceData, context) {
    // Get Mailchimp List Service
    const mailchimpListService = context.container.resolve(
      "mailchimpListService"
    );

    // Check if list exists
    const list = mailchimpListService.retrieve(input.audienceName);

    // If list does not exist, create it
    if (list.status !== 200) {
      const createList = mailchimpListService.create(input.audienceName);

      // If list creation fails, throw error
      if (createList.status !== 200) {
        throw new Error(
          "Error while creating list in Mailchimp: " + list.message
        );
      }
    }

    // Add subscriber to list
    const result = mailchimpListService.addSubscriber(input);

    // If adding subscriber fails, throw error
    if (result.status !== 200) {
      throw new Error(
        "Error while adding subscriber to Mailchimp: " + result.message
      );
    }

    // Return the result
    return new StepResponse(result);
  },
  async function (result, context) {
    // If workflow error occurs, log it to the console and remove subscriber from list
    console.log("Error while adding subscriber, rolling back Mailchimp...");

    const {
      data: { id },
    } = result;

    const mailchimpListService = context.container.resolve(
      "mailchimpListService"
    );

    mailchimpListService.removeSubscriber(id);
  }
);
