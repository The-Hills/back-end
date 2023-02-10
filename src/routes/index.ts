import userRouter from "./user.route";
import authRouter from "./auth.route";
import kidRouter from "./kid.route";

const route = (app) => {
  app.use("/auth", authRouter);
  app.use("/kid", kidRouter);
  app.use("/", userRouter);
};

export default route;
