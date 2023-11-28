import { BaseService } from "medusa-interfaces";

class Email extends BaseService {
  async send(...args) {
    // fails 10% of the time
    if (Math.random() < 0.1) {
      throw new Error("Failed to send the email.");
    }

    return true;
  }
}

export default Email;
