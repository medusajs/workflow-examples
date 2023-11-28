import { GoogleAudienceData } from "src/workflows/types";

class GoogleAdsAudienceService {
  customer_id: string;

  constructor(customer_id: string) {
    this.customer_id = customer_id;
  }

  retrieve(name: string) {
    // Mocking the API endpoint
    // Log the mock data to the console
    console.log("Mocking Google API Request: retrieve");

    // Randomly throw an error
    if (Math.random() > 0.9) {
      return {
        status: 404,
        audience: null,
        message: "Google Ads audience not found",
      };
    }

    // Mocking a successful response
    return {
      status: 200,
      audience: {
        id: Math.floor(Math.random() * 10000).toString(),
        name,
      },
      message: `Google Ads Audience retrieved successfully`,
    };
  }

  create(name: string) {
    // Mocking the API endpoint
    // Log the mock data to the console
    console.log("Mocking Google API Request: create");

    // Randomly throw an error
    if (Math.random() > 0.9) {
      return {
        status: 401,
        audience: null,
        message: "Google Ads audience not created",
      };
    }

    // Mocking a successful response
    return {
      status: 200,
      audience: {
        id: Math.floor(Math.random() * 10000).toString(),
        name,
      },
      message: `Google Ads Audience ${name} created`,
    };
  }

  addSubscriber(data: GoogleAudienceData) {
    // Mocking the API endpoint
    // Log the mock data to the console
    console.log("Mocking Google API Request: addSubscriber");
    console.log({ data });

    // Randomly throw an error
    if (Math.random() > 0.9) {
      return {
        status: 401,
        audience: null,
        message: "Google Ads subscriber not added",
      };
    }

    // Mocking a successful response
    return {
      status: 200,
      id: Math.floor(Math.random() * 10000).toString(),
      message: `User ${data.emailAddress} added to Google Ads audience ${data.audienceName}`,
    };
  }

  removeSubscriber(id: string, audienceName: string) {
    // Mocking the API endpoint
    // Log the mock data to the console
    console.log("Mocking Google API Request: removeSubscriber");
    console.log({ id });

    // Randomly throw an error
    if (Math.random() > 0.9) {
      return {
        status: 401,
        message: "Google Ads subscriber not removed",
      };
    }

    // Mocking a successful response
    return {
      status: 200,
      message: `User ${id} deleted from Google Ads audience ${audienceName}`,
    };
  }
}

export default GoogleAdsAudienceService;
