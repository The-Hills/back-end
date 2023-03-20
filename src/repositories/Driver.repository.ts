import { DriverStatus, Gender } from "../utils/Enum";
import { IDriver } from "../utils/interfaces";
import { AppDataSource } from "./../data-source";
import { Driver } from "./../entities/Driver.entity";
import { Account } from "./../entities/Account.entity";
import uploadImage from "./../services/s3Client.service";

const driverRepo = AppDataSource.getRepository(Driver);

const driverRepositoty = {
  getAllDriver: async () => {
    return await driverRepo.find({
      relations: {
        account: true,
        vehicle: {
          vehicleType: true,
        },
        booking: true,
      },
    });
  },

  getDriverById: async (id: string) => {
    const driver = await driverRepo.findOne({
      where: {
        id,
      },
      relations: {
        vehicle: {
          vehicleType: true,
        },
        booking: {
          kid: true,
        },
        account: true,
      },
    });

    if (driver === null) {
      return null;
    }
    return driver;
  },

  createDriver: async (payload) => {
    const { name, phone, gender, avatar, cardId, driverLicense, acc } = payload;
    let image = "";
    if (avatar) {
      image = await uploadImage("driver", avatar);
    }
    const license = await uploadImage("driver", driverLicense);
    const newDriver = driverRepo.create({
      name,
      phone,
      gender,
      avatar: image,
      cardId,
      driverLicense: license,
      account: acc,
    });
    return await driverRepo.save(newDriver);
  },

  updateDriver: async (id: string, payload: IDriver) => {
    const {
      name,
      phone,
      gender,
      avatar,
      cardId,
      driverLicense,
      isVerify,
      currentLocation,
      status,
    } = payload;
    const driver = await driverRepo.findOne({
      where: {
        id,
      },
      relations: {
        booking: true,
        vehicle: true,
        account: true,
      },
    });
    let image: string;
    if (avatar) {
      image = await uploadImage("driver", avatar);
    }

    let newStatus: DriverStatus;

    if (status === 'active') {
      newStatus = DriverStatus.active
    } else {
      newStatus = DriverStatus.unActive
    }

    if (driver) {
      driver.name = name || driver.name;
      driver.avatar = image || driver.avatar;
      driver.phone = phone || driver.phone;
      driver.gender = gender || driver.gender;
      driver.cardId = cardId || driver.cardId;
      driver.driverLicense = driverLicense || driver.driverLicense;
      driver.currentLocation =
        `POINT(${currentLocation?.latitude} ${currentLocation?.longitude})` ||
        driver.currentLocation;
      driver.booking = driver.booking;
      driver.vehicle = driver.vehicle;
      driver.account = driver.account;
      driver.isVerify = isVerify === undefined ? driver.isVerify : !driver.isVerify;
      driver.status = newStatus;
      if (!driver.isVerify) {
        driver.status = DriverStatus.unActive;
      }

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

  logout: async (id: string) => {
    const driver = await driverRepo.findOneBy({ id });
    if (driver) {
      driver.status = DriverStatus.unActive;
      driver.currentLocation = null;
    }
    return driverRepo.save(driver);
  },

  updateStatus: async (id: string, status: DriverStatus) => {
    const driver = await driverRepo.findOneBy({ id });
    if (driver) {
      driver.status = status;
    }
    return driverRepo.save(driver);
  },

  getTotalDriver: async () => {
    return await driverRepo.count()
  }
};

export default driverRepositoty;
