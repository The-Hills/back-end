import { Request, Response } from "express";
import { PayloadVehicle } from "../utils/interfaces";
import vehicleRepository from "./../repositories/Vehicle.repository";
import bookingService from "./../services/booking.service";

const vehicleController = {
  index: async (req: Request, res: Response) => {
    const listVehicleType = await vehicleRepository.getAllVehicle();
    if (listVehicleType === null) {
      return res.status(500).json({
        message: "Error",
      });
    }
    return res.status(200).json({
      message: "Successfully",
      data: listVehicleType,
    });
  },

  store: async (req: Request, res: Response) => {
    const payload: PayloadVehicle = req.body;

    const image = req.files.image;

    payload.vehicleImage = image;

    const vehicle = await vehicleRepository.createVehicle(payload);
    if (vehicle === null) {
      return res.status(500).json({
        message: "Error",
      });
    }
    return res.status(200).json({
      message: "Successfully",
      data: vehicle,
    });
  },

  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await vehicleRepository.updateVehicle(id, payload);

    if (result === null) {
      return res.status(500).json({
        message: "Error",
      });
    }
    return res.status(200).json({
      message: "Successfully",
      data: result,
    });
  },

};

export default vehicleController;
