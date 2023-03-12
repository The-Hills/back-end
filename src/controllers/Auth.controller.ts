import { Request, Response, NextFunction } from "express";
import authService from "./../services/auth.service";
import accountRepository from "./../repositories/Account.repository";
import { loginPayload, RegisterUserPayload } from "../utils/interfaces";
import { validationResult } from "express-validator";
import { IDriver } from "./../utils/interfaces";
import { AccountType } from "../utils/Enum";

const authController = {
  allAccount: async (req: Request, res: Response, next: NextFunction) => {
    const listAcc = await accountRepository.getAllAccount();
    if (listAcc.length !== 0) {
      res.status(200).json({ message: "Successfully", data: listAcc });
    } else {
      res.status(200).json({ message: "List Empty", data: [] });
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const data: loginPayload = req.body;
      const result = await authService.login(data);
      if (result === null) {
        res
          .status(401)
          .json({ message: "Authentication failed. User not found." });
      } else if (!result) {
        res
          .status(401)
          .json({ message: "Authentication failed. Wrong password." });
      } else {
        const { token, id, role } = result;
        res.status(200).json({
          message: "Successfully",
          token,
          id,
          role,
        });
      }
    }
    catch (err) {
      next({ status: 404, messages: err })
    }

  },

  register: async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const data: RegisterUserPayload = req.body;
      const acc = await authService.register(data);
      if (!acc) {
        return next({ status: 400, message: "Email is exits" })
      }
      res.status(200).json({ message: "Successfully", data: acc });
    }
    catch (err) {
      next({ status: 400, message: err })
    }
  },

  driverRigester: async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const data: IDriver = req.body;

      const driverLicense = req?.files?.driverLicense;
      if (!driverLicense) {
        return res.status(500).json({ message: "driver license is required! " });
      }
      data.driverLicense = driverLicense
      data.avatar = req?.files?.avatar;
      data.role = AccountType.driver;
      const acc = await authService.driverRegister(data);
      if (!acc) {
        return next({ status: 400, message: "Email is exits" })
      }
      res.status(200).json({ message: "Successfully", data: acc });
    }
    catch (err) {
      next({ status: 400, message: err })
    }
  },

  driverLogin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: loginPayload = req.body;
      const result = await authService.driverLogin(data);
      if (result === null) {
        return next({ status: 404, message: "Authentication failed. User not found." })
      } else if (!result) {
        return next({ status: 404, message: "Authentication failed. Wrong password." })
      } else {
        const { token, id, role } = result;
        res.status(200).json({
          message: "Successfully",
          token,
          id,
          role,
        });
      }
    } catch (err) {
      next({ status: 400, message: err })
    }
  },

  adminRegister: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      console.log(data);
      data.role = AccountType.admin;
      const acc = await authService.adminRegister(data);
      if (!acc) {
        return next({ status: 400, message: "Email is exits" })
      }
      res.status(200).json({ message: "Successfully", data: acc });
    } catch (err) {
      next({ status: 400, message: err })
    }

  },

  adminLogin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: loginPayload = req.body;
      const result = await authService.adminLogin(data);
      if (result === null) {
        return next({ status: 404, message: "Authentication failed. User not found." })
      } else if (!result) {
        return next({ status: 404, message: "Authentication failed. Wrong password." })
      } else {
        const { token, id, role } = result;
        res.status(200).json({
          message: "Successfully",
          token,
          id,
          role,
        });
      }
    } catch (err) {
      next({ status: 400, message: err })
    }
  },
};

export default authController;
