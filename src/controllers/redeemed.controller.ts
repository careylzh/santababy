/**Controllers provided me with a high-lvl abstraction of the methods concerned with a model,
 * so at a glance I can know the methods involved wihtout having to deal with the business logic.
 */

import { Body, Get, Inject, Post, Query, Request, Route, Tags } from "tsoa";
import { RedeemedTeams } from "../models";

//import methods interfaces from repo layer, where business logic is
import {
  checkRedeemed,
  addRedeemed,
  getAllRedeemedTeams,
} from "../repository/redeemed.repository";
import { UserPayload } from "../repository/users.repository";

@Route("/redeemed")
@Tags("UserPayload")
export default class RedeemedController {
  @Get("/checkRedeemed")
  public async checkRedeemed(
    @Request() payload: UserPayload
  ): Promise<Boolean> {
    return checkRedeemed(payload);
  }
  @Post("/addRedeemed")
  public async addRedeemed(
    @Request() payload: UserPayload
  ): Promise<RedeemedTeams> {
    return addRedeemed(payload);
  }
  @Get("/")
  public async getAllRedeemedTeams(): Promise<Array<RedeemedTeams>> {
    return getAllRedeemedTeams();
  }
}
