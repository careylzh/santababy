import UserController from "./users.controller";
import * as UserRepository from "../repository/users.repository";

//As we are unit testing the controller, mock depedency redeemed repository
describe("UserController", () => {
  describe("getAllUsers", () => {
    test("Should return empty array when database is empty", async () => {
      const spy = jest
        .spyOn(UserRepository, "getAllUsers")
        .mockResolvedValueOnce([]);
      const controller = new UserController();
      const usersResults = await controller.getAllUsers();
      expect(usersResults).toEqual([]);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });

    test("should return user list when database is not empty", async () => {
      const usersList = [
        {
          staff_pass_id: "STAFF_UHEJXNQ9RMPT",
          team_name: "SLYTHERIN",
          created_at: Date.now().toString(),
        },
      ];
      const spy = jest
        .spyOn(UserRepository, "getAllUsers")
        .mockResolvedValueOnce(usersList);
      const controller = new UserController();
      const usersResults = await controller.getAllUsers();
      expect(usersResults).toEqual(usersList);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });
  });

  describe("verify", () => {
    test("Should return standard json if staff_pass_id is undefined/empty", async () => {
      const staffPassId = "STAFF_YF060FCSLQMY";
      const userPayload: UserRepository.UserPayload = {
        validUser: false,
        staffPassId: "",
        teamName: "",
      };
      const spy = jest
        .spyOn(UserRepository, "getUser")
        .mockResolvedValueOnce(userPayload);
      const controller = new UserController();
      const userResults = await controller.verify(staffPassId);
      console.log(userResults);
      expect(userResults).toEqual(userPayload);
      expect(spy).toHaveBeenCalledWith(staffPassId);
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });
  });
});
