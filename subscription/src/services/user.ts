import { BaseService } from "medusa-interfaces";

class User extends BaseService {
  async retrieveByEmail(email: string) {
    return {
      id: "user_1",
      name: "John Doe",
      email,
    };
  }
}

export default User;
