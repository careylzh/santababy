/**Routing logic to subrouters
 * This file is the entry point for subrouters, which call their respective controllers
 */
import express from "express";
import UserRouter from "./ user.router";

const router = express.Router();

router.use("/users", UserRouter);

export default router;
