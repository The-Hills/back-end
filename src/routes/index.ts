import userRouter from "./user.route";
import authRouter from "./auth.roure";

const route = (app) => {
  app.use("/", userRouter);
  app.use("/auth", authRouter);
};

export default route;
