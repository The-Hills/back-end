import * as express from "express";
import userController from "./../controllers/User.controller";

const userRouter = express.Router();

userRouter.delete("/:id", userController.destroy);
userRouter.get("/:id", userController.show);
userRouter.get("/", userController.index);
userRouter.post("/", userController.store);

export default userRouter;
