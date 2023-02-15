import accountRepository from "./../repositories/Account.repository";
import { loginUserPayload, RegisterUserPayload } from "../utils/interfaces";
import * as bcrypt from "bcrypt";
import userRepository from "./../repositories/User.repository";
import generateAccessToken from "./../middlewares/token";
import * as jwt from "jsonwebtoken";
import { IDriver } from "./../utils/interfaces";
import driverRepositoty from "./../repositories/Driver.repository";

const authService = {
  login: async (paylod: loginUserPayload) => {
    const { email, password } = paylod;
    if (await accountRepository.exitsEmail(email)) {
      const account = await accountRepository.getAccountByEmail(email);
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
    const emailIsExits = await accountRepository.exitsEmail(email);
    if (!emailIsExits) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const acc = await accountRepository.createAccount(
        email,
        hashedPassword,
        role
      );
      return await userRepository.createUser(name, phone, gender, acc);
    }
    return false;
  },

  driverRegister: async (payload: IDriver) => {
    const {
      email,
      password,
      role,
      name,
      phone,
      gender,
      avatar,
      cardId,
      driverLicense,
    } = payload;

    const emailIsExits = await accountRepository.exitsEmail(email);
    if (!emailIsExits) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const acc = await accountRepository.createAccount(
        email,
        hashedPassword,
        role
      );
      return await driverRepositoty.createDriver(
        name,
        phone,
        gender,
        avatar,
        cardId,
        driverLicense,
        acc
      );
    }
    return false;
  },

  logout: () => {},
};

export default authService;
