import { RedeemedTeams } from "../models";

//import methods interfaces from repo layer, where business logic is
import {
  checkRedeemed,
  addRedeemed,
  getAllRedeemedTeams,
} from "../repository/redeemed.repository";
import { UserPayload } from "../repository/users.repository";
export default class RedeemedController {
  public async checkRedeemed(payload: UserPayload): Promise<Boolean> {
    return checkRedeemed(payload);
  }
  public async addRedeemed(payload: UserPayload): Promise<RedeemedTeams> {
    return addRedeemed(payload);
  }

  public async getAllRedeemedTeams(): Promise<Array<RedeemedTeams>> {
    return getAllRedeemedTeams();
  }
}
