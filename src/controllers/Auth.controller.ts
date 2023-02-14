import { Request, Response } from "express";
import authService from "./../services/auth.service";
import accountRepository from "./../repositories/Account.repository";
import { loginUserPayload, RegisterUserPayload } from "../utils/interfaces";
import { validationResult } from "express-validator";
import { IDriver } from "./../utils/interfaces";
import { AccountType } from "../utils/Enum";

const authController = {
  allAccount: async (req: Request, res: Response) => {
    const listAcc = await accountRepository.getAllAccount();
    if (listAcc.length !== 0) {
      res.status(200).json({ message: "Successfully", data: listAcc });
    } else {
      res.status(200).json({ message: "List Empty", data: [] });
    }
  },

  login: async (req: Request, res: Response) => {
    console.log("login");
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data: loginUserPayload = req.body;
    const token = await authService.login(data);
    if (token === null) {
      res
        .status(401)
        .json({ message: "Authentication failed. User not found." });
    } else if (!token) {
      res
        .status(401)
        .json({ message: "Authentication failed. Wrong password." });
    } else {
      res.status(200).json({
        message: "Successfully",
        token,
      });
    }
  },

  register: async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data: RegisterUserPayload = req.body;
    const acc = await authService.register(data);
    if (!acc) {
      return res.status(500).json({ message: "Email is exits" });
    }
    res.status(200).json({ message: "Successfully", data: acc });
  },

  driverRigester: async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data: IDriver = req.body;
    data.role = AccountType.driver;
    const acc = await authService.driverRegister(data);
    if (!acc) {
      return res.status(500).json({ message: "Email is exits" });
    }
    res.status(200).json({ message: "Successfully", data: acc });
  },
};

export default authController;
