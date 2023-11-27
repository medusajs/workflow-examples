import { MetaAudienceData } from "../workflows/types";

class MetaAdsAudienceService {
  retrieve(name: string) {
    // Mocking the API endpoint
    // Log the mock data to the console
    console.log("Mocking Meta API Request: retrieve");

    // Randomly throw an error
    if (Math.random() > 0.9) {
      return {
        status: 404,
        audience: null,
        message: "Meta Ads audience not found",
      };
    }

    // Mocking a successful response
    return {
      status: 200,
      audience: {
        id: Math.floor(Math.random() * 10000).toString(),
        name,
      },
      message: `Meta Audience retrieved successfully`,
    };
  }

  create({
    name,
    subtype,
    description,
    customer_file_source,
  }: {
    name: string;
    subtype: string;
    description: string;
    customer_file_source: string;
  }) {
    // Mocking the API endpoint
    // Log the mock data to the console
    console.log("Mocking Meta API Request: create");

    // Randomly throw an error
    if (Math.random() > 0.9) {
      return {
        status: 401,
        audience: null,
        message: "Meta Ads audience not created",
      };
    }

    // Mocking a successful response
    return {
      status: 200,
      audienceData: {
        id: Math.floor(Math.random() * 10000).toString(),
        name,
        subtype,
        description,
        customer_file_source,
      },
      message: `Audience ${name} created`,
    };
  }

  addSubscriber(data: MetaAudienceData) {
    // Mocking the API endpoint
    // Log the mock data to the console
    console.log("Mocking Meta API Request: addSubscriber");
    console.log({ data });

    // Randomly throw an error
    if (Math.random() > 0.9) {
      return {
        status: 401,
        audience: null,
        message: "Meta Adssubscriber not added",
      };
    }

    // Mocking a successful response
    return {
      status: 200,
      id: Math.floor(Math.random() * 10000).toString(),
      message: `User ${data.email} added to Meta Ads audience`,
    };
  }

  removeSubscriber(id: string, audienceName: string) {
    // Mocking the API endpoint
    // Log the mock data to the console
    console.log("Mocking Meta API Request: removeSubscriber");
    console.log({ id, audienceName });

    // Randomly throw an error
    if (Math.random() > 0.9) {
      return {
        status: 401,
        message: "Meta Ads audience not removed",
      };
    }

    // Mocking a successful response
    return {
      status: 200,
      message: `User ${id} removed from Meta Ads audience ${audienceName}`,
    };
  }
}

export default MetaAdsAudienceService;
