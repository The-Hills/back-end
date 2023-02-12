import * as express from "express";
import authController from "../controllers/Auth.controller";
import authValidator from "./../validator/authValidator";

const authRouter = express.Router();

authRouter.get("/", authController.allAccount);
authRouter.post("/login", authValidator.validatorLogin(), authController.login);
authRouter.post(
  "/register",
  authValidator.validateRegisterUser(),
  authController.register
);

export default authRouter;
