import { Request, Response, NextFunction } from "express";
import userRepository from "./../repositories/User.repository";

const userController = {
  index: (req: Request, res: Response, next: NextFunction) => {
    userRepository
      .getAllUser()
      .then((users) => {
        res.json(users);
      })
      .catch(next);
  },

  show: (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    userRepository
      .getUserById(userId)
      .then((user) => {
        res.json(user);
      })
      .catch(next);
  },

  store: (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    userRepository
      .createUser(data)
      .then(() => {
        res.send(data);
      })
      .catch(next);
  },

  destroy: (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    userRepository
      .deleteUser(userId)
      .then(() => res.send("successfully"))
      .catch(next);
  },
};

export default userController;
