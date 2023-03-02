import { AppDataSource } from "../data-source";
import { AccountType } from "../utils/Enum";
import { Account } from "./../entities/Account.entity";

const accRepo = AppDataSource.getRepository(Account);

const accountRepository = {
  getAllAccount: async () => {
    return await accRepo.find({
      relations: {
        user: true,
        driver: true,
        admin: true,
      },
    });
  },

  getAccountByEmail: async (email: string) => {
    return await accRepo.findOne({
      where: {
        email,
      },
      relations: {
        user: true,
        driver: true,
        admin: true,
      },
    });
  },

  getAccountById: async (id: string) => {
    return await accRepo.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });
  },

  createAccount: async (email: string, password: string, role: AccountType) => {
    return await accRepo.save(accRepo.create({ email, password, type: role }));
  },

  exitsEmail: async (email: string) => {
    return await accRepo.exist({ where: { email } });
  },
};

export default accountRepository;
