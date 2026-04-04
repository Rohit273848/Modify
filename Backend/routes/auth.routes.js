import express from "express";
import authController from "../controllers/auth.controller.js";
import {authUser} from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/get-me", authUser, authController.getme);
authRouter.post("/logout",authController.logout);

export default authRouter;