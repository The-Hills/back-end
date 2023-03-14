import { IDriver, PayloadBooking } from "../utils/interfaces";
import { AppDataSource } from "./../data-source";
import { Booking } from "./../entities/Booking.entity";
import kidRepository from "./Kid.repository";
import driverRepositoty from "./Driver.repository";
import { BookingStatus, DriverStatus } from "../utils/Enum";
import vehicleTypeRepository from "./VehicleType.repository";
import userRepository from './User.repository';

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

  statistical: async () => {
    const bookingList = await bookingRepo.find();

    const data = []

    const total = bookingList?.reduce((value, currentValue) => {
      return value + currentValue.fee
    }, 0)

    const userCount = await userRepository.getTotalUser()

    const driverCount = await driverRepositoty.getTotalDriver()

    const kidCount = await kidRepository.getTotalKid()

    const bookingCount = bookingList.length

    const count = {
      user: userCount,
      driver: driverCount,
      kid: kidCount,
      booking: bookingCount
    }
    bookingList?.reduce((result, bookingList) => {
      const { startTime } = bookingList
      const monthIndex = startTime.getMonth();
      if (!result[monthIndex]) {
        result[monthIndex] = { month: monthIndex, totalFee: 0, count: 0 };
      }
      result[monthIndex].count += 1;
      result[monthIndex].totalFee += (bookingList.fee);
      return result;
    }, [])?.map((data) => {
      const monthName = new Date(2023, data.month).toLocaleDateString('default', { month: '2-digit', day: '2-digit', year: 'numeric' });
      return {
        name: monthName,
        count: data.count,
        data: data.totalFee,
      };
    })?.filter((item => item !== null && item !== undefined)).map(item => {

      data.push(item.count)

    });
    return { total, count, data }
  },


  statisticalByDate: async (date: Date) => {
    // const booking = await bookingRepo.createQueryBuilder("booking").where("Date(booking.startTime) = :date", { date }).getMany();

    const booking = await bookingRepo.find()
    const countBooking = booking.length;

    const total = booking?.reduce((value, currentValue) => {
      return value + currentValue.fee
    }, 0)
    return { booking, countBooking, total }
  },


  statisticalByMonth: async (month: string) => {
    const booking = await bookingRepo.createQueryBuilder("booking").where("Month(booking.startTime) = :month", { month }).getMany();
    const total = booking?.reduce((value, currentValue) => {
      return value + currentValue.fee
    }, 0)
    return total
  }
};

export default bookingRepository;
