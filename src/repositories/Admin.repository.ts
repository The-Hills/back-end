import { AppDataSource } from "./../data-source";
import { Administrator } from "./../entities/Administrator.entity";
import { Account } from "./../entities/Account.entity";

const adminRepo = AppDataSource.getRepository(Administrator);

const adminRepository = {
  create: async (name: string, acc: Account) => {
    const newAdmin = adminRepo.create({ name, account: acc });
    return await adminRepo.save(newAdmin);
  },
};

export default adminRepository;
