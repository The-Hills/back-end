import { Request, Response, NextFunction } from "express";
import userRepository from "./../repositories/User.repository";

const userController = {
  index: async (req: Request, res: Response) => {
    const listUser = await userRepository.getAllUser();
    if (listUser.length !== 0) {
      res.status(200).json({ message: "Successfully", data: listUser });
    } else {
      res
        .status(200)
        .json({ message: "There are no users in the list", data: listUser });
    }
  },
  show: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const user = await userRepository.getUserById(userId);
      if (user) {
        return res.status(200).json({ message: "Successfully", data: user });
      }
      next({ status: 404, message: "Not found" })
    }
    catch (err) {
      next({ status: 400, message: err })
    }

  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const userData = req.body;
      userData.avatar = req.file;
      const user = await userRepository.updateUser(userId, userData);
      if (user) {
        return res.status(200).json({
          message: "Successfully",
          data: user,
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
      const userId = req.params.id;
      const user = await userRepository.deleteUser(userId);
      if (user) {
        return res.status(200).json({
          message: "Successfully",
          data: user,
        });
      }
      next({ status: 404, message: "Not found" })
    }
    catch (err) {
      next({ status: 400, message: err })
    }
  },
};

export default userController;
