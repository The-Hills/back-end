import userRouter from "./user.route";
import authRouter from "./auth.route";
import kidRouter from "./kid.route";
import setCurrentUser from "../middlewares";

const route = (app) => {
  app.use("/auth", authRouter);
  app.use("/kid", kidRouter);
  app.use("/", setCurrentUser, userRouter);
};

export default route;
