import * as express from "express";
import kidController from "./../controllers/Kid.controller";

const kidRouter = express.Router();

kidRouter.get("/:id", kidController.show);
kidRouter.post("/", kidController.store);
kidRouter.delete("/:id", kidController.destroy);
kidRouter.get("/", kidController.index);

export default kidRouter;
