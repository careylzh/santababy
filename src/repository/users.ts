import { getRepository } from "typeorm";
import { Users } from "../models";

export interface UserPayload {
  validUser: boolean;
  staffPassId: string;
  teamName: string;
}

export const getUser = async (
  staffPassId: string
): Promise<UserPayload | Boolean> => {
  const userRepository = getRepository(Users);
  const user = await userRepository.findOne({ staff_pass_id: staffPassId });
  if (!user) {
    console.log(staffPassId);
    console.log(user);
    return false;
  }
  return {
    validUser: true,
    staffPassId: user.staff_pass_id,
    teamName: user.team_name,
  };
};

export const getAllUsers = async (): Promise<Array<Users>> => {
  const userRepository = getRepository(Users);
  return userRepository.find();
};
