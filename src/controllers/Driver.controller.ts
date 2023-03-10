import { Request, Response } from "express";
import driverRepositoty from "../repositories/Driver.repository";
import { IDriver } from "./../utils/interfaces";

const driverController = {
  index: async (req: Request, res: Response) => {
    const listDriver = await driverRepositoty.getAllDriver();
    if (listDriver.length !== 0) {
      res.status(200).json({ message: "Successfully", data: listDriver });
    } else {
      res
        .status(200)
        .json({ message: "There are no users in the list", data: listDriver });
    }
  },

  show: async (req: Request, res: Response) => {
    const driverId = req.params.id;
    const driver = await driverRepositoty.getDriverById(driverId);
    if (driver) {
      res.status(200).json({ message: "Successfully", data: driver });
    } else {
      res.status(400).json({ message: "ID is not defined" });
    }
  },

  update: async (req: Request, res: Response) => {
    const driverId = req.params.id;
    const payload: IDriver = req.body;
    payload.avatar = req.files?.avatar

    const driver = await driverRepositoty.updateDriver(driverId, payload);

    if (driver) {
      return res.status(200).json({
        message: "Successfully",
        data: driver,
      });
    }

    return res.status(400).json({
      message: "Id is not defined",
    });
  },

  destroy: async (req: Request, res: Response) => {
    const driverId = req.params.id;
    const user = await driverRepositoty.deleteDriver(driverId);
    if (user) {
      res.status(200).json({
        message: "Successfully",
      });
    } else {
      res.status(400).json({
        message: "Id is not defined",
      });
    }
  },
};

export default driverController;
