import { Kid } from "../entities/Kid.entity";
import { Gender } from "../utils/Enum";
import { AppDataSource } from "./../data-source";
import userRepository from "./User.repository";
import { UploadedFile } from "express-fileupload";
import uploadImage from "./../services/s3Client.service";
import generateQR from './../services/QRcode.service';

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
    let avatar;
    if (image) {
      avatar = await uploadImage("kid", image);
    }
    const parent = await userRepository.getUserById(parentId);
    const newKid = await kidRepo.save(kidRepo.create({
      name,
      age,
      gender,
      parent,
      avatar,
    }));


    const qr = await generateQR(newKid.id)
    console.log('qr =>', qr)
    newKid.qr = qr
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
      const image = await uploadImage("kid", avatar);
      kid.name = name || kid.name;
      kid.age = age || kid.age;
      kid.avatar = image || kid.avatar;
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
};

export default kidRepository;
