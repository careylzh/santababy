import { Users } from "../models";

//import methods interfaces from repo layer, where business logic is
import { getUser, getAllUsers, UserPayload } from "../repository/users";

export default class UserController {
  public async verify(jsonString: {
    staff_pass_id: string;
  }): Promise<UserPayload | Boolean> {
    return getUser(String(jsonString.staff_pass_id));
  }
  public async getAllUsers(): Promise<Array<Users>> {
    return getAllUsers();
  }
}
