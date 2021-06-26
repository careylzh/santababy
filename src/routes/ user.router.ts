import express from "express";
import UserController from "../controllers/user.controller";

const router = express.Router();

router.get("/verify", async (req, res) => {
  const controller = new UserController();
  console.log(req);
  const response = await controller.verify(req.body); //TODO: response is {boolean} or boolean?
  return res.send(response); //boolean
});

router.get("/", async (_req, res) => {
  const controller = new UserController();
  const response = await controller.getAllUsers();
  return res.send(response);
});

export default router;