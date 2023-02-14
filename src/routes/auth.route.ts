import {Router} from "express";
import authController from "../controllers/Auth.controller";

const authRouter = Router();

authRouter.get("/", authController.allAccount);
authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);

export default authRouter;
