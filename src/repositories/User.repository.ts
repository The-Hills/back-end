import { AppDataSource } from "../data-source";
import { User } from "../entities/User.entity";
import { Gender } from "../utils/Enum";
import { Account } from "./../entities/Account.entity";

const userRepo = AppDataSource.getRepository(User);

const userRepository = {
  getAllUser: async () => {
    return await userRepo.find({
      relations: {
        kid: true,
        account: true,
      },
    });
  },

  getUserById: async (id: string) => {
    const user = await userRepo.findOne({
      relations: {
        kid: true,
      },
      where: {
        id,
      },
    });
    if (user === null) {
      return null;
    }
    console.log("get ID");
    return user;
  },

  createUser: async (
    name: string,
    phone: string,
    gender: Gender,
    acc: Account
  ) => {
    const newUser = await userRepo.create({
      name,
      gender,
      phone,
      account: acc,
    });
    return await userRepo.save(newUser);
  },

  updateUser: async (id: string, data: User) => {
    const { name, avatar, gender } = data;
    const user = await userRepo.findOneBy({ id });
    if (user === null) {
      return null;
    }
    user.gender = gender || user.gender;
    user.name = name || user.name;
    user.avatar = avatar || user.avatar;
    return userRepo.save(user);
  },

  deleteUser: async (id: string) => {
    const user = await userRepo.findOneBy({ id });
    if (user === null) {
      return null;
    }
    return await userRepo.delete({ id });
  },
};

export default userRepository;
