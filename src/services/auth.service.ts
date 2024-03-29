import accountRepository from "./../repositories/Account.repository";
import {
  loginPayload,
  PayloadAdmin,
  RegisterUserPayload,
} from "../utils/interfaces";
import * as bcrypt from "bcrypt";
import userRepository from "./../repositories/User.repository";
import generateAccessToken from "./../middlewares/token";
import { IDriver } from "./../utils/interfaces";
import driverRepositoty from "./../repositories/Driver.repository";
import adminRepository from "./../repositories/Admin.repository";
import vehicleRepository from './../repositories/Vehicle.repository';

const authService = {
  login: async (paylod: loginPayload) => {
    const { email, password } = paylod;
    if (await accountRepository.exitsEmail(email)) {
      const account = await accountRepository.getAccountByEmail(email);
      if (account.type === "user") {
        const passwordCompare = await bcrypt.compare(
          password,
          account?.password
        );
        if (passwordCompare) {
          const id = account.user.id;
          const role = account.type;
          const token = generateAccessToken(account.type, id);
          return { token, id, role };
        }
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
      vehicleName,
      vehicleColor,
      vehicleLicensePlates,
      vehicleType,
    } = payload;

    const emailIsExits = await accountRepository.exitsEmail(email);
    if (!emailIsExits) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const acc = await accountRepository.createAccount(
        email,
        hashedPassword,
        role
      );

      const dataVehicle = {
        vehicleName,
        vehicleColor,
        licensePlates: vehicleLicensePlates,
        type: vehicleType,
      }

      const vehicle = await vehicleRepository.createVehicle(dataVehicle)
      const data = {
        name,
        phone,
        gender,
        avatar,
        cardId,
        driverLicense,
        acc,
        vehicle
      };
      return await driverRepositoty.createDriver(data);
    }
    return false;
  },

  driverLogin: async (paylod: loginPayload) => {
    const { email, password } = paylod;
    if (await accountRepository.exitsEmail(email)) {
      const account = await accountRepository.getAccountByEmail(email);
      if (account.type === "driver") {
        if (account.driver.isVerify) {
          const passwordCompare = await bcrypt.compare(
            password,
            account?.password
          );
          if (passwordCompare) {
            const id = account.driver.id;
            const role = account.type;
            const token = generateAccessToken(account.type, id);
            return { token, id, role };
          }
        }
      }
      return false;
    }
    return null;
  },

  adminRegister: async (payload: PayloadAdmin) => {
    const { email, password, role, name } = payload;
    const emailIsExits = await accountRepository.exitsEmail(email);
    if (!emailIsExits) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const acc = await accountRepository.createAccount(
        email,
        hashedPassword,
        role
      );
      return await adminRepository.create(name, acc);
    }
    return false;
  },

  adminLogin: async (paylod: loginPayload) => {
    const { email, password } = paylod;
    if (await accountRepository.exitsEmail(email)) {
      const account = await accountRepository.getAccountByEmail(email);
      if (account.type === "admin") {
        const passwordCompare = await bcrypt.compare(
          password,
          account?.password
        );
        if (passwordCompare) {
          const id = account.admin.id;
          const role = account.type;
          const token = generateAccessToken(account.type, id);
          return { token, id, role };
        }
      }
      return false;
    }
    return null;
  },

  logout: async (id: string) => {
    const driver = await driverRepositoty.getDriverById(id);
    if (driver) {
      return await driverRepositoty.logout(id);
    }
    return null;
  },
};

export default authService;
