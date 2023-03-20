import * as express from "express";
import driverController from "../controllers/Driver.controller";

const driverRouter = express.Router();

driverRouter.put("/:id",driverController.update);
driverRouter.delete("/:id", driverController.destroy);
driverRouter.get("/:id", driverController.show);
driverRouter.get("/", driverController.index);

export default driverRouter;
