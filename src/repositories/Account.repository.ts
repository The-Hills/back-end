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

  getAccountById: async (id: string) => {
    return await accRepo.findOneBy({ id });
  },

  createAccount: async (
    email: string,
    password: string,
    role: AccountType,
    user: User
  ) => {
    return await accRepo.save(
      await accRepo.create({ email, password, type: role, user })
    );
  },
};

export default accountRepository;
