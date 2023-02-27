import { Kid } from "../entities/Kid.entity";
import { Gender } from "../utils/Enum";
import { AppDataSource } from "./../data-source";
import userRepository from "./User.repository";
import { UploadedFile } from "express-fileupload";
import uploadImage from "./../services/s3Client.service";

const kidRepo = AppDataSource.getRepository(Kid);

const kidRepository = {
  getAllKid: async () => {
    return await kidRepo.find({
      relations: {
        parent: true,
      },
    });
  },

  getKidById: async (id: string) => {
    const kid = await kidRepo.findOneBy({ id });

    if (kid === null) {
      return null;
    }
    return await kidRepo.findOne({
      relations: {
        parent: true,
      },
      where: {
        id,
      },
    });
  },

  createKid: async (
    parentId: string,
    name: string,
    age: number,
    gender: Gender,
    image: UploadedFile
  ) => {
    console.log("image =>", image);
    const avatar = await uploadImage("kid", image);
    if (avatar) {
      const parent = await userRepository.getUserById(parentId);
      const newKid = kidRepo.create({
        name,
        age,
        gender,
        parent,
        avatar,
      });
      return await kidRepo.save(newKid);
    }
  },

  deleteKid: async (id: string) => {
    const kid = await kidRepo.findOneBy({ id });
    if (kid === null) {
      return false;
    } else {
      return await kidRepo.delete({ id });
    }
  },
};

export default kidRepository;
