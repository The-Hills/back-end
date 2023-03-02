import { Request, Response } from "express";
import authService from "./../services/auth.service";
import accountRepository from "./../repositories/Account.repository";
import { loginPayload, RegisterUserPayload } from "../utils/interfaces";
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
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
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

  driverLogin: async (req: Request, res: Response) => {
    const data: loginPayload = req.body;
    const result = await authService.driverLogin(data);
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
  },

  adminRegister: async (req: Request, res: Response) => {
    const data = req.body;
    console.log(data);
    data.role = AccountType.admin;
    const acc = await authService.adminRegister(data);
    if (!acc) {
      return res.status(500).json({ message: "Email is exits" });
    }
    res.status(200).json({ message: "Successfully", data: acc });
  },

  adminLogin: async (req: Request, res: Response) => {
    const data: loginPayload = req.body;
    const result = await authService.adminLogin(data);
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
      console.log(token);
      res.status(200).json({
        message: "Successfully",
        token,
        id,
        role,
      });
    }
  },
};

export default authController;
