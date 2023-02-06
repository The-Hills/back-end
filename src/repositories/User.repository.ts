import { AppDataSource } from "../data-source";
import { User } from "../entities/User.entity";

const userRepo = AppDataSource.getRepository(User);

const userRepository = {
  getAllUser: async () => {
    return await userRepo.find();
  },

  getUserById: async (id: number) => {
    return await userRepo.findOneBy({ id });
  },

  createUser: async (data) => {
    const newUser = await userRepo.create(data);
    return await userRepo.save(newUser);
  },

  updateUser: async () => {},

  deleteUser: async (id: number) => {
    return await userRepo.delete({ id });
  },
};

export default userRepository;
