import { Request, Response, NextFunction } from "express";
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

  show: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const driverId = req.params.id;
      const driver = await driverRepositoty.getDriverById(driverId);
      if (driver) {
        return res.status(200).json({ message: "Successfully", data: driver });
      }
      next({ status: 404, message: "Not found" })
    }
    catch (err) {
      next({ status: 400, message: err })
    }

  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
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

      next({ status: 404, message: "Not found" })
    }
    catch (err) {
      next({ status: 400, message: err })
    }

  },

  destroy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const driverId = req.params.id;
      const user = await driverRepositoty.deleteDriver(driverId);
      if (user) {
        return res.status(200).json({
          message: "Successfully",
        });
      }
      next({ status: 404, message: "Not found" })
    } catch (err) {
      next({ status: 400, message: err })
    }
  },
};

export default driverController;
