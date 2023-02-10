import { Request, Response } from "express";
import authService from "./../services/auth.service";
import accountRepository from "./../repositories/Account.repository";
import { RegisterUserPayload } from "../utils/interfaces";

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
    const { email, password } = req.body;
    const token = await authService.login(email, password);
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
    const data: RegisterUserPayload = req.body;
    const acc = await authService.register(data);
    res.status(200).json({ message: "Successfully", data: acc });
  },
};

export default authController;
