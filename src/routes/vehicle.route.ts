import { Router } from "express";
import vehicleController from "./../controllers/Vehicle.controller";


const vehicleRouter = Router();

vehicleRouter.post("/", vehicleController.store);
vehicleRouter.get("/vehicletype", vehicleController.listVehicleType);
vehicleRouter.get("/", vehicleController.index);

export default vehicleRouter;
