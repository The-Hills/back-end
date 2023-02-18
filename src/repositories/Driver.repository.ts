import { Gender } from "../utils/Enum";
import { IDriver } from "../utils/interfaces";
import { AppDataSource } from "./../data-source";
import { Driver } from "./../entities/Driver.entity";
import { Account } from "./../entities/Account.entity";

const driverRepo = AppDataSource.getRepository(Driver);

const driverRepositoty = {
  getAllDriver: async () => {
    return await driverRepo.find({
      relations: {
        account: true,
        vehicle: {
          vehicleType: true
        },
      },
    });
  },

  getDriverById: async (id: string) => {
    const driver = await driverRepo.findOneBy({ id });

    if (driver === null) {
      return null;
    }
    return driver;
  },

  createDriver: async (
    name: string,
    phone: string,
    gender: Gender,
    avatar: string,
    cardId: number,
    driverLicense: string,
    acc: Account
  ) => {
    const newDriver = await driverRepo.create({
      name,
      phone,
      gender,
      avatar,
      cardId,
      driverLicense,
      account: acc,
    });

    return await driverRepo.save(newDriver);
  },

  updateDriver: async (id: string, payload: IDriver) => {
    const { name, phone, gender, avatar, cardId, driverLicense } = payload;
    const driver = await driverRepo.findOneBy({ id });
    if (driver) {
      driver.name = name || driver.name;
      driver.avatar = avatar || driver.avatar;
      driver.phone = phone || driver.phone;
      driver.gender = gender || driver.gender;
      driver.cardId = cardId || driver.cardId;
      driver.driverLicense = driverLicense || driver.driverLicense;
      return await driverRepo.save(driver);
    }
    return null;
  },

  deleteDriver: async (id: string) => {
    const driver = await driverRepo.findOneBy({ id });
    if (driver) {
      return await driverRepo.delete(driver);
    }
    return null;
  },

  driverChangeStatus: () => {},
};

export default driverRepositoty;
