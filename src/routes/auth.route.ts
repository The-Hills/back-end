import * as express from "express";
import authController from "../controllers/Auth.controller";

const authRouter = express.Router();

authRouter.get("/", authController.allAccount);
authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);

export default authRouter;
