import { Request, Response, NextFunction } from "express";
import authService from "./../services/auth.service";

const authController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (await authService.login(email, password)) {
      res.send("Ok");
    } else {
      res.send("khong duoc");
    }
  },

  register: () => {},
};

export default authController;
