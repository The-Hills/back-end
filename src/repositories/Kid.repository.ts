import { Kid } from "../entities/Kid.entity";
import { Gender } from "../utils/Enum";
import { AppDataSource } from "./../data-source";
import userRepository from "./User.repository";
import { UploadedFile } from "express-fileupload";
import uploadImage, { generateQR } from "./../services/s3Client.service";


const kidRepo = AppDataSource.getRepository(Kid);

const kidRepository = {
  getAllKid: async () => {
    return await kidRepo.find({
      relations: {
        parent: true,
        booking: {
          driver: true,
        },
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
        booking: {
          driver: true,
        },
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
    let avatar: string;
    const parent = await userRepository.getUserById(parentId);
    const newKid = await kidRepo.save(kidRepo.create({
      name,
      age,
      gender,
      parent,
      avatar,
    }));
    const qr = await generateQR(newKid.id)
    if (qr) {
      newKid.qr = qr
    }
    await kidRepo.save(newKid)
    return newKid;
  },

  updateKid: async (id: string, payload) => {
    const { name, age, avatar, gender } = payload;
    const kid = await kidRepo.findOne({
      where: { id },
      relations: {
        parent: true,
        booking: true,
      },
    });
    if (kid) {
      kid.name = name || kid.name;
      kid.age = age || kid.age;
      kid.booking;
      kid.parent;
      kid.gender = gender || kid.gender;
      return await kidRepo.save(kid);
    }
    return false;
  },

  deleteKid: async (id: string) => {
    const kid = await kidRepo.findOneBy({ id });
    if (kid === null) {
      return false;
    } else {
      return await kidRepo.delete({ id });
    }
  },

  getTotalKid: async () => {
    return await kidRepo.count()
  }
};

export default kidRepository;
