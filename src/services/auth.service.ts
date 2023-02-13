import accountRepository from "./../repositories/Account.repository";
import { RegisterUserPayload } from "../utils/interfaces";
import * as bcrypt from "bcrypt";
import userRepository from "./../repositories/User.repository";
import generateAccessToken from "./../middlewares/token";

const authService = {
  login: async (email: string, password: string) => {
    const account = await accountRepository.getAccountByEmail(email);
    if (account?.email) {
      const passwordCompare = await bcrypt.compare(password, account?.password);
      if (passwordCompare) {
        const token = generateAccessToken(account);
        return token;
      }
      return false;
    }
    return null;
  },

  register: async (payload: RegisterUserPayload) => {
    const { email, password, phone, name, gender, role } = payload;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.createUser(name, phone, gender);
    return await accountRepository.createAccount(
      email,
      hashedPassword,
      role,
      user
    );
  },

  logout: () => {},
};

export default authService;
