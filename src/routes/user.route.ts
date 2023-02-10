import * as express from "express";
import userController from "./../controllers/User.controller";

const userRouter = express.Router();

userRouter.delete("/:id", userController.destroy);
userRouter.get("/:id", userController.show);
userRouter.put("/:id", userController.update);
userRouter.get("/", userController.index);

export default userRouter;
