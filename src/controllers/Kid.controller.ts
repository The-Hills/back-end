import { Request, Response, NextFunction } from "express";
import kidRepository from "./../repositories/Kid.repository";

const kidController = {
  index: async (req: Request, res: Response) => {
    const kids = await kidRepository.getAllKid();
    res.status(200).json({ message: "Successfully", data: kids });
  },

  show: async (req: Request, res: Response, next: NextFunction) => {
    const kid = await kidRepository.getKidById(req.params.id);
    try {
      if (kid) {
        return res.json({ massage: "Succesefully", data: kid });
      }
      next({ status: 404, message: "Not found" })
    }
    catch (err) {
      next({ status: 400, message: err })
    }
  },

  store: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, age, gender, parentId } = req.body;
      const image = req.files?.avatar;
      const kid = await kidRepository.createKid(
        parentId,
        name,
        age,
        gender,
        image
      );

      res.status(200).json({ message: "Successfully", kid });
    }
    catch (err) {
      next({ status: 400, message: err })
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const kidId = req.params.id;
      const data = req.body;
      data.avatar = req.files.avatar;
      const kid = await kidRepository.updateKid(kidId, data);
      if (kid) {
        return res
          .status(200)
          .json({ message: "Successfully", image: req.files.avatar });
      }
      next({ status: 404, message: "Not found" })
    }
    catch (err) {
      next({ status: 400, message: err })
    }
  },

  destroy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const kidId = req.params.id;
      const kidDeleted = await kidRepository.deleteKid(kidId);
      if (kidDeleted) {
        res.status(200).json({ message: "Successfully" });
      }
      next({ status: 404, message: "Not found" })
    } catch (err) {
      next({ status: 400, message: err })
    }

  },
};

export default kidController;
