import userRouter from "./user.route";
import authRouter from "./auth.route";
import kidRouter from "./kid.route";
import driverRouter from "./driver";

const route = (app) => {
  app.use("/driver", driverRouter);
  app.use("/auth", authRouter);
  app.use("/kid", kidRouter);
  app.use("/", userRouter);
};

export default route;
