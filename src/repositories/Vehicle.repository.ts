import { AppDataSource } from "../data-source";
import { VehicleInfo } from "../entities/VehicleInfo.entity";
import { payloadVehicle } from "../utils/interfaces";
import vehicleTypeRepository from "./VehicleType.repository";
import driverRepositoty from "./Driver.repository";

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

  createVehicle: async (payload: payloadVehicle) => {
    const { vehicleName, vehicleColor, licensePlates, type, driverId } =
      payload;
    const driver = await driverRepositoty.getDriverById(driverId);
    const vehicleType = await vehicleTypeRepository.getVehicleByName(type);
    const vehicle = await vehicleRepo.create({
      vehicleName,
      vehicleColor,
      licensePlates,
      vehicleType,
      driver,
    });

    return await vehicleRepo.save(vehicle);
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

  updateVehicle: async (id: string, payload: payloadVehicle) => {
    const { vehicleName, vehicleColor, licensePlates } = payload;

    const vehicle = await vehicleRepo.findOneBy({ id });

    vehicle.vehicleName = vehicleName || vehicle.vehicleName;
    vehicle.vehicleColor = vehicleColor || vehicle.vehicleColor;
    vehicle.licensePlates = licensePlates || vehicle.licensePlates;

    return vehicleRepo.save(vehicle);
  },
};

export default vehicleRepository;
