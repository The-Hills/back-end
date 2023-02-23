import { PayloadBooking } from "../utils/interfaces";
import { AppDataSource } from "./../data-source";
import { Booking } from "./../entities/Booking.entity";
import kidRepository from "./Kid.repository";
import { PayloadVehicle } from "./../utils/interfaces";
import driverRepositoty from "./Driver.repository";
import { BookingStatus } from "../utils/Enum";
import { Point } from "../utils/helper";

const bookingRepo = AppDataSource.getRepository(Booking);

const bookingRepository = {
  getALlBooking: async () => {
    const listBooking = await bookingRepo.find({
      relations: {
        kid: {
          parent: true,
        },
        dirver: {
          vehicle: true,
        },
      },
    });

    console.log(listBooking);

    return listBooking;
  },

  getListBookingWaitingDriver: async () => {
    const listBookingWaitingDriver = await bookingRepo.find({
      where: {
        status: BookingStatus.onTracking,
      },
      relations: {
        kid: {
          parent: true,
        },
      },
    });
  },

  createBooking: async (payload: PayloadBooking) => {
    const { distance, startLocation, endLocation, kidId, fee, payment } =
      payload;

    const kid = await kidRepository.getKidById(kidId);

    const booking = new Booking();

    booking.distance = distance;

    booking.startLocation = `'POINT(${startLocation.latitude} ${startLocation.longitude})',0`;
    booking.endLocation = `'POINT(${endLocation.latitude} ${endLocation.longitude})',0`;

    booking.kid = kid;
    booking.fee = fee;
    booking.payment = payment;

    console.log("booking => ", booking);

    return await bookingRepo.save(booking);
  },

  updateAccpectBooking: async (id: string, payload: PayloadBooking) => {
    const { dirverId } = payload;
    const driver = await driverRepositoty.getDriverById(dirverId);
    const booking = await bookingRepo.findOne({
      where: {
        id,
      },
      relations: {
        kid: {
          parent: true,
        },
        dirver: {
          vehicle: true,
        },
      },
    });
    bookingRepo.merge(booking, {
      dirver: driver,
      status: BookingStatus.onRide,
    });
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
        dirver: {
          vehicle: true,
        },
      },
    });
    // await bookingRepo.update({ id }, { status: BookingStatus.conpleted });
    bookingRepo.merge(booking, { status: BookingStatus.conpleted });
    return await bookingRepo.save(booking);
  },
};

export default bookingRepository;
