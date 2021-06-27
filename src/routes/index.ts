/**Routing logic to subrouters
 * This file is the entry point for subrouters, which call their respective controllers
 */
import express from "express";
import UserRouter from "./ users.router";
import RedeemedRouter from "./redeemed.router";
const router = express.Router();

router.use("/users", UserRouter);
router.use("/redeemed", RedeemedRouter);

export default router;
