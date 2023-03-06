import { IDriver, PayloadBooking } from "../utils/interfaces";
import { AppDataSource } from "./../data-source";
import { Booking } from "./../entities/Booking.entity";
import kidRepository from "./Kid.repository";
import driverRepositoty from "./Driver.repository";
import { BookingStatus, DriverStatus } from "../utils/Enum";
import vehicleTypeRepository from "./VehicleType.repository";

const bookingRepo = AppDataSource.getRepository(Booking);

const bookingRepository = {
  getALlBooking: async () => {
    const listBooking = await bookingRepo.find({
      relations: {
        kid: {
          parent: true,
        },
        driver: {
          vehicle: true,
        },
      },
    });

    return listBooking;
  },

  getListBookingWaitingDriver: async (type: string) => {
    const vehicle = await vehicleTypeRepository.getVehicleByName(type);
    const listBookingWaitingDriver = await bookingRepo.find({
      where: {
        status: BookingStatus.onTracking,
        vehicleType: vehicle,
      },
      relations: {
        kid: {
          parent: true,
        },
      },
    });
    return listBookingWaitingDriver;
  },

  createBooking: async (payload: PayloadBooking) => {
    const {
      distance,
      startLocation,
      endLocation,
      startPosition,
      endPosition,
      kidId,
      fee,
      payment,
      typeVehicle,
    } = payload;

    const kid = await kidRepository.getKidById(kidId);

    const vehicle = await vehicleTypeRepository.getVehicleByName(typeVehicle);
    console.log(vehicle);

    const booking = new Booking();

    booking.distance = distance;

    booking.startPosition = `POINT(${startPosition.latitude} ${startPosition.longitude})`;
    booking.endPosition = `POINT(${endPosition.latitude} ${endPosition.longitude})`;
    booking.startLocation = startLocation;
    booking.endLocation = endLocation;
    booking.kid = kid;
    booking.fee = fee;
    booking.payment = payment;
    booking.vehicleType = vehicle;

    return await bookingRepo.save(booking);
  },

  updateAccpectBooking: async (id: string, payload: PayloadBooking) => {
    const { driverId } = payload;
    const driver = await driverRepositoty.getDriverById(driverId);
    const booking = await bookingRepo.findOne({
      where: {
        id,
      },
      relations: {
        kid: {
          parent: true,
        },
        driver: {
          vehicle: true,
        },
      },
    });
    bookingRepo.merge(booking, {
      driver: driver,
      status: BookingStatus.onRide,
    });
    await driverRepositoty.updateStatus(driverId, DriverStatus.onRide);
    return await bookingRepo.save(booking);
  },

  updateCompletedBooking: async (id: string) => {
    const booking = await bookingRepo.findOne({
      where: {
        id,
      },
      relations: {
        kid: {
          parent: true,
        },
        driver: {
          vehicle: true,
        },
      },
    });
    bookingRepo.merge(booking, { status: BookingStatus.conpleted });
    await driverRepositoty.updateStatus(booking.driver.id, DriverStatus.active);
    return await bookingRepo.save(booking);
  },
};

export default bookingRepository;
