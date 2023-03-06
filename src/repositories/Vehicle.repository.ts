import { AppDataSource } from "../data-source";
import { VehicleInfo } from "../entities/VehicleInfo.entity";
import { PayloadVehicle } from "../utils/interfaces";
import vehicleTypeRepository from "./VehicleType.repository";
import driverRepositoty from "./Driver.repository";
import uploadImage from "./../services/s3Client.service";

const vehicleRepo = AppDataSource.getRepository(VehicleInfo);

const vehicleRepository = {
  getAllVehicle: async () => {
    const listVehicle = vehicleRepo.find({
      relations: {
        driver: true,
        vehicleType: true,
      },
    });

    return listVehicle;
  },

  createVehicle: async (payload: PayloadVehicle) => {
    const {
      vehicleName,
      vehicleColor,
      licensePlates,
      vehicleImage,
      type,
      driverId,
    } = payload;
    const image = await uploadImage("vehicle", vehicleImage);
    const driver = await driverRepositoty.getDriverById(driverId);
    const vehicleType = await vehicleTypeRepository.getVehicleByName(type);
    if (image) {
      const vehicle = await vehicleRepo.create({
        vehicleName,
        vehicleColor,
        licensePlates,
        vehicleType,
        vehicleImage: image,
        driver,
      });
      return await vehicleRepo.save(vehicle);
    }
  },

  getVehicleById: async (id: string) => {
    const vehicle = await vehicleRepo.findOne({
      where: {
        id,
      },
      relations: {
        vehicleType: true,
      },
    });
    return vehicle;
  },

  updateVehicle: async (id: string, payload: PayloadVehicle) => {
    const { vehicleName, vehicleColor, licensePlates } = payload;

    const vehicle = await vehicleRepo.findOneBy({ id });

    vehicle.vehicleName = vehicleName || vehicle.vehicleName;
    vehicle.vehicleColor = vehicleColor || vehicle.vehicleColor;
    vehicle.licensePlates = licensePlates || vehicle.licensePlates;

    return vehicleRepo.save(vehicle);
  },
};

export default vehicleRepository;
