import { Router } from "express";
import authController from "../controllers/Auth.controller";
import authValidator from "./../validator/authValidator";

const authRouter = Router();

authRouter.get("/", authController.allAccount);
authRouter.post("/login", authValidator.validatorLogin(), authController.login);
authRouter.post(
  "/register",
  authValidator.validateRegisterUser(),
  authController.register
);

authRouter.post("/register/driver", authController.driverRigester);
authRouter.post("/login/driver", authController.driverLogin);

export default authRouter;
