import * as express from "express";
import userController from "./../controllers/User.controller";
import authController from "./../controllers/Auth.controller";

const authRouter = express.Router();

authRouter.post("/", authController.login);

export default authRouter;
