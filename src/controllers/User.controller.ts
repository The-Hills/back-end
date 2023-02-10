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
  show: async (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = await userRepository.getUserById(userId);
    if (user) {
      res.status(200).json({ message: "Successfully", data: user });
    } else {
      res.status(400).json({ message: "ID is not defined" });
    }
  },

  update: async (req: Request, res: Response) => {
    const userId = req.params.id;
    const userData = req.body;
    const user = await userRepository.updateUser(userId, userData);
    if (user) {
      res.status(200).json({
        message: "Successfully",
        data: user,
      });
    } else {
      res.status(400).json({
        message: "Id is not defined",
      });
    }
  },

  destroy: async (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = await userRepository.deleteUser(userId);
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

export default userController;
