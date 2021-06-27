/**This subrouter file:
 *  - connects your endpoints to the RedeemedController
 *  - is referenced in this directory's index.ts(main router that defines your endpoints)
 */
import express from "express";
import RedeemedController from "../controllers/redeemed.controller";

const router = express.Router();

router.get("/checkRedeemed", async (req, res) => {
  const controller = new RedeemedController();
  const response = await controller.checkRedeemed(req.body); //TODO: response is {boolean} or boolean?
  return res.send(response);
});

router.get("/addRedeemed", async (_req, res) => {
  const controller = new RedeemedController();

  const response = await controller.addRedeemed(_req.body);
  return res.send(response);
});

//must get all redeemed teams also if not redeemed route doesnt return anything
router.get("/", async (_req, res) => {
  const controller = new RedeemedController();
  const response = await controller.getAllRedeemedTeams();
  return res.send(response);
});
export default router;
