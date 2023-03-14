import { Request, Response, NextFunction } from "express";
import { PayloadVehicle } from "../utils/interfaces";
import vehicleRepository from "./../repositories/Vehicle.repository";
import vehicleTypeRepository from './../repositories/VehicleType.repository';

const vehicleController = {
  index: async (req: Request, res: Response,) => {
    const listVehicle = await vehicleRepository.getAllVehicle();
    if (listVehicle === null) {
      return res.status(500).json({
        message: "Error",
      });
    }
    return res.status(200).json({
      message: "Successfully",
      data: listVehicle,
    });
  },

  store: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload: PayloadVehicle = req.body;

      const image = req.files?.image;

      payload.vehicleImage = image;

      const vehicle = await vehicleRepository.createVehicle(payload);

      return res.status(200).json({
        message: "Successfully",
        data: vehicle,
      });
    }
    catch (err) {
      next({ status: 400, message: err })
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const payload = req.body;
      const result = await vehicleRepository.updateVehicle(id, payload);

      if (result === null) {
        return next({ status: 404, message: "Not found" })
      }
      res.status(200).json({
        message: "Successfully",
        data: result,
      });
    }
    catch (err) {
      next({ status: 400, message: err })
    }
  },

  listVehicleType: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vehicleTypeList = await vehicleTypeRepository.getAllVehicleType();
      return res.status(200).json({
        message: "Successfully",
        data: vehicleTypeList,
      });
    }
    catch (err) {
      next({ status: 400, message: err })
    }
  }

};

export default vehicleController;
