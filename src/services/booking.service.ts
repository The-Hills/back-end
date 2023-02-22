import vehicleTypeRepository from "./../repositories/VehicleType.repository";
const bookingService = {
  caclulatedPrice: async (distance: number, type: string) => {
    let discount = 0;

    const vehicle = await vehicleTypeRepository.getVehicleByName(type);
    console.log(vehicle);
    if (vehicle === null) {
      return false;
    }

    const price = vehicle.price;

    if (distance >= 3 && distance <= 5) {
      discount = (price * 5) / 100;
    } else if (distance > 6) {
      discount = (price * 10) / 100;
    }

    const total = distance * (price - discount);
    console.log(total);

    return total;
  },
};

export default bookingService;
