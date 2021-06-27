/**This subrouter file:
 *  - connects your endpoints to the UserController
 *  - is referenced in this directory's index.ts(main router that defines your endpoints)
 */
import express from "express";
import UserController from "../controllers/users.controller";

const router = express.Router();

router.get("/verify", async (req, res) => {
  const controller = new UserController();
  const staff_pass_id: string = String(req.query.staff_pass_id);
  const response = await controller.verify(staff_pass_id);
  return res.send(response);
});

router.get("/", async (_req, res) => {
  const controller = new UserController();
  const response = await controller.getAllUsers();
  return res.send(response);
});

export default router;
