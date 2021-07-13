/**Controllers provided me with a high-lvl abstraction of the methods concerned with a model,
 * so at a glance I can know the methods involved wihtout having to deal with the business logic.
 */

import { Get, Route, Tags, Path, Request, Query } from "tsoa";
import { Users } from "../models";

//import methods interfaces from repo layer, where business logic is
import {
  getUser,
  getAllUsers,
  UserPayload,
} from "../repository/users.repository";

@Route("/users")
@Tags("UserPayload")
export default class UserController {
  @Get("/verify")
  public async verify(@Query() staff_pass_id: string): Promise<UserPayload> {
    return getUser(String(staff_pass_id));
  }
  @Get("/")
  public async getAllUsers(): Promise<Array<Users>> {
    return getAllUsers();
  }
}
