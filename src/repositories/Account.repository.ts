import { AppDataSource } from "../data-source";
import { AccountType } from "../utils/Enum";
import { Account } from "./../entities/Account.entity";
import { User } from "./../entities/User.entity";

const accRepo = AppDataSource.getRepository(Account);

const accountRepository = {
  getAllAccount: async () => {
    return await accRepo.find();
  },

  getAccountByEmail: async (email: string) => {
    return await accRepo.findOne({
      where: {
        email,
      },
    });
  },

  createAccount: async (
    email: string,
    password: string,
    role: AccountType
  ) => {
    return await accRepo.save(
      await accRepo.create({ email, password, type: role })
    );
  },

  exitsEmail: async (email: string) => {
    return await accRepo.exist({ where: { email } });
  },
};

export default accountRepository;
