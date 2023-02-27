import { Request, Response, NextFunction } from "express";
import kidRepository from "./../repositories/Kid.repository";

const kidController = {
  index: async (req: Request, res: Response) => {
    const kids = await kidRepository.getAllKid();
    res.json(kids);
  },

  show: async (req: Request, res: Response) => {
    const kid = await kidRepository.getKidById(req.params.id);
    console.log(kid);
    if (kid) {
      res.json({ massage: "Succesefully", data: kid });
    } else {
      res.status(400).json({ message: "", error: "" });
    }
  },

  store: async (req: Request, res: Response) => {
    const { name, age, gender, parentId } = req.body;
    const image = req.files.avatar;
    const kid = await kidRepository.createKid(
      parentId,
      name,
      age,
      gender,
      image
    );
    res.json(kid);
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
