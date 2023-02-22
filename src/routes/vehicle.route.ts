import { Router } from "express";
import vehicleController from "./../controllers/Vehicle.controller";

const vehicleRouter = Router();

vehicleRouter.post("/", vehicleController.store);
vehicleRouter.post("/getprice", vehicleController.getPrice);
vehicleRouter.get("/", vehicleController.index);

export default vehicleRouter;
