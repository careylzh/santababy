import { getRepository } from "typeorm";
import { RedeemedTeams } from "../models";
import { UserPayload } from "./users.repository";

export const checkRedeemed = async (payload: UserPayload): Promise<boolean> => {
  const redeemedRepository = getRepository(RedeemedTeams);
  const redeemed = await redeemedRepository.findOne({
    team_name: payload.teamName,
  });
  if (!redeemed) return false;
  return true;
};

export const addRedeemed = async (
  payload: UserPayload
): Promise<RedeemedTeams> => {
  const redeemedRepository = getRepository(RedeemedTeams);
  console.log(Date.now().toString());
  return redeemedRepository.save({
    team_name: payload.teamName,
    staff_pass_id: payload.staffPassId,
    redeemed_at: Date.now().toString(),
  });
};

export const getAllRedeemedTeams = async (): Promise<Array<RedeemedTeams>> => {
  const redeemedRepository = getRepository(RedeemedTeams);
  return redeemedRepository.find();
};
