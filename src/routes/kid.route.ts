import { Router } from "express";
import kidController from "./../controllers/Kid.controller";

const kidRouter = Router();

kidRouter.get("/:id", kidController.show);
kidRouter.put("/:id", kidController.update);
kidRouter.delete("/:id", kidController.destroy);
kidRouter.post("/", kidController.store);
kidRouter.get("/", kidController.index);

export default kidRouter;
