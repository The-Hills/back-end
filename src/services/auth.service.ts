import accountRepository from "./../repositories/Account.repository";
import { RegisterUserPayload } from "../utils/interfaces";
import * as bcrypt from "bcrypt";
import userRepository from "./../repositories/User.repository";
import * as jwt from "jsonwebtoken";

const authService = {
  login: async (email: string, password: string) => {
    const account = await accountRepository.getAccountByEmail(email);
    if (account?.email) {
      const passwordCompare = await bcrypt.compare(password, account?.password);
      if (passwordCompare) {
        const token = jwt.sign({ account }, "shhhhh");
        account.access_tonken = token;
        accountRepository.updateToken(account);
        return token;
      }
      return false;
    }
    return null;
  },

  register: async (payload: RegisterUserPayload) => {
    const { email, password, phone, name, gender, role } = payload;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.createUser(name, gender);
    return await accountRepository.createAccount(
      email,
      hashedPassword,
      phone,
      role,
      user
    );
  },
};

export default authService;
