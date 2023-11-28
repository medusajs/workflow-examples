import { MailchimpAudienceData } from "../workflows/types";

class MailchimpListService {
  retrieve(name: string) {
    // Mocking the API endpoint
    // Log the mock data to the console
    console.log("Mocking Mailchimp API Request: retrieve");

    // Randomly throw an error
    if (Math.random() > 0.9) {
      return {
        status: 404,
        list: null,
        message: "Mailchimp list not found",
      };
    }

    // Mocking a successful response
    return {
      status: 200,
      list: {
        id: Math.floor(Math.random() * 10000).toString(),
        name,
      },
      message: `List retrieved successfully`,
    };
  }

  create({ name }: { name: string }) {
    // Mocking the API endpoint
    // Log the mock data to the console
    console.log("Mocking Mailchimp API Request: create");

    // Randomly throw an error
    if (Math.random() > 0.9) {
      return {
        status: 401,
        list: null,
        message: "Mailchimp list not created",
      };
    }

    // Mocking a successful response
    return {
      status: 200,
      list: {
        id: Math.floor(Math.random() * 10000).toString(),
        name,
      },
      message: `List ${name} created`,
    };
  }

  addSubscriber(data: MailchimpAudienceData) {
    // Mocking the API endpoint
    const { audienceName, ...user } = data;

    // Log the mock data to the console
    console.log("Mocking Mailchimp API Request: addSubscriber");
    console.log({ data });

    // Randomly throw an error
    if (Math.random() > 0.9) {
      return {
        status: 401,
        audience: null,
        message: "Mailchimp subscriber not added",
      };
    }

    // Mocking a successful response
    return {
      status: 200,
      user,
      message: `User ${user.email_address} added to Mailchimp list ${audienceName}`,
    };
  }

  removeSubscriber(id: string) {
    // Mocking the API endpoint
    // Log the mock data to the console
    console.log("Mocking Mailchimp API Request: removeSubscriber");
    console.log({ id });

    // Randomly throw an error
    if (Math.random() > 0.9) {
      return {
        status: 401,
        message: "Mailchimp subscriber not removed",
      };
    }

    // Mocking a successful response
    return {
      status: 200,
      message: `User ${id} deleted from Mailchimp list ${id}`,
    };
  }
}

export default MailchimpListService;
