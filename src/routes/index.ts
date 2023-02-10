import userRouter from "./user.route";
import authRouter from "./auth.route";
import kidRouter from "./kid.route";
import authenticateToken from './../middlewares/index';

const route = (app) => {
  app.use("/auth", authRouter);
  app.use("/kid", kidRouter);
  app.use("/", authenticateToken, userRouter);
};

export default route;
