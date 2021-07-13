/**This subrouter file:
 *  - connects your endpoints to the RedeemedController
 *  - is referenced in this directory's index.ts(main router that defines your endpoints)
 */
import express from "express";
import RedeemedController from "../controllers/redeemed.controller";
import { UserPayload } from "../repository/users.repository";

const router = express.Router();

router.get("/checkRedeemed", async (req, res) => {
  const controller = new RedeemedController();
  const userPayload: UserPayload = {
    validUser: Boolean(req.query.validUser),
    teamName: String(req.query.teamName),
    staffPassId: String(req.query.staffPassId),
  };
  const response = await controller.checkRedeemed(userPayload); //TODO: response is {boolean} or boolean?
  return res.send(response);
});

router.post("/addRedeemed", async (req, res) => {
  const controller = new RedeemedController();
  const userPayload: UserPayload = {
    validUser: Boolean(req.query.validUser),
    teamName: String(req.query.teamName),
    staffPassId: String(req.query.staffPassId),
  };
  console.log(req.query);
  const response = await controller.addRedeemed(userPayload);
  return res.send(response);
});

router.get("/", async (req, res) => {
  const controller = new RedeemedController();
  const response = await controller.getAllRedeemedTeams();
  return res.send(response);
});
export default router;
