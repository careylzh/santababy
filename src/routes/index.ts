/**
 * Subrouter that deals with the routing logic
 */

import express from "express";
import UserController from "../controllers/user";

const router = express.Router();

//TODO: verify() should be a post req that sends the staff_pass_id received to check if user is valid
router.get("/user", async (_req, res) => {
  const controller = new UserController();
  const response = await controller.verify();
  return res.send(response);
});

export default router;
