import { Request, Response, NextFunction } from "express";
import kidRepository from "./../repositories/Kid.repository";

const kidController = {
  index: async (req: Request, res: Response) => {
    const kids = await kidRepository.getAllKid();
    res.status(200).json({ message: "Successfully", data: kids });
  },

  show: async (req: Request, res: Response) => {
    const kid = await kidRepository.getKidById(req.params.id);
    if (kid) {
      res.json({ massage: "Succesefully", data: kid });
    } else {
      res.status(400).json({ message: "Failed", error: "Id is not define" });
    }
  },

  store: async (req: Request, res: Response) => {
    const { name, age, gender, parentId } = req.body;
    const image = req.files?.avatar;
    const kid = await kidRepository.createKid(
      parentId,
      name,
      age,
      gender,
      image
    );
    res.json(kid);
  },

  update: async (req: Request, res: Response) => {
    const kidId = req.params.id;
    const data = req.body;
    data.avatar = req.files.avatar;
    const kid = await kidRepository.updateKid(kidId, data);
    if (kid) {
      res
        .status(200)
        .json({ message: "Successfully", image: req.files.avatar });
    } else {
      res.status(400).json({ message: "Id is not define" });
    }
  },

  destroy: async (req: Request, res: Response) => {
    const kidId = req.params.id;
    const kidDeleted = await kidRepository.deleteKid(kidId);
    if (kidDeleted) {
      res.status(200).json({ message: "Successfully" });
    } else {
      res.status(400).json({ message: "Id is not define" });
    }
  },
};

export default kidController;
