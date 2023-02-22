import { AppDataSource } from "../data-source";
import { VehicleType } from "../entities/VehicleType.entity";

const vehicleTypeRepo = AppDataSource.getRepository(VehicleType);

const vehicleTypeRepository = {
  getAllVehicleType: async () => {
    const listVehicleType = await vehicleTypeRepo.find();
    return listVehicleType;
  },

  getVehicleByName: async (name: string) => {
    const vehicleTye = await vehicleTypeRepo.findOneBy({ name });
    return vehicleTye;
  },
};

export default vehicleTypeRepository;
