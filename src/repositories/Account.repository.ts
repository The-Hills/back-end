import { AppDataSource } from "../data-source";
import { Account } from "./../entities/Account.entity";

const accRepo = AppDataSource.getRepository(Account);

const accountRepository = {
  getAllAccount: async () => {
    const accounts = await accRepo.find();
    return accounts;
  },

  getEmailAccount: async (email: string) => {
    return await accRepo.findOneBy({ email });
  },

  getPassword: async (password: string) => {
    return await accRepo.findOneBy({ password });
  },

  createUser: async (data) => {
    const newUser = await accRepo.create(data);
    return await accRepo.save(newUser);
  },

  updateUser: async () => {},

  deleteUser: async (id: number) => {
    return await accRepo.delete({ id });
  },
};

export default accountRepository;
