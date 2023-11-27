import { BaseService } from "medusa-interfaces";

class EmailService extends BaseService {
  async send(opts: { templateId: string; data: { email: string }[] }) {
    console.log("=== SENDING EMAIL TO THE CUSTOMERS ===", opts);
  }
}

export default EmailService;
