import userRouter from "./user.route";
import authRouter from "./auth.route";
import kidRouter from "./kid.route";
import { Router } from "express";
import { isLoggedIn } from "../middlewares";
import setCurrentUser from "./../middlewares/index";
import driverRouter from "./driver.route";
import vehicleRouter from "./vehicle.route";

const middlewareRouter = Router();

middlewareRouter.use("/driver", driverRouter);
// middlewareRouter.use("/vehicle", vehicleRouter);
middlewareRouter.use("/kid", kidRouter);
middlewareRouter.use("/", userRouter);

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/vehicle", vehicleRouter);
rootRouter.use("/", setCurrentUser, isLoggedIn, middlewareRouter);

export default rootRouter;
