import { AppDataSource } from "../data-source";
import { AccountType } from "../utils/Enum";
import { Account } from "./../entities/Account.entity";
import { User } from "./../entities/User.entity";

const accRepo = AppDataSource.getRepository(Account);

const accountRepository = {
  getAllAccount: async () => {
    return await accRepo.find({
      relations: {
        user: true,
      },
    });
  },

  getAccountByEmail: async (email: string) => {
    return await accRepo.findOne({
      relations: {
        user: true,
        driver: true,
      },
      where: {
        email,
      },
    });
  },

  createAccount: async (
    email: string,
    password: string,
    phone: string,
    role: AccountType,
    user: User
  ) => {
    return await accRepo.save(
      await accRepo.create({ email, password, phone, type: role, user })
    );
  },

  updateToken: async (acc: Account) => {
    await accRepo.save(acc);
  },

  exitsEmail: async (email: string) => {
    return await accRepo.exist({ where: { email } });
  },
};

export default accountRepository;
