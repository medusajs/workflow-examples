import { BaseService } from "medusa-interfaces";

class Payment extends BaseService {
  async refundPayment(...args) {
    return true;
  }
}

export default Payment;
