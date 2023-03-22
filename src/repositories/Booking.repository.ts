import { PayloadBooking } from "../utils/interfaces";
import { AppDataSource } from "./../data-source";
import { Booking } from "./../entities/Booking.entity";
import kidRepository from "./Kid.repository";
import driverRepositoty from "./Driver.repository";
import { BookingStatus, DriverStatus } from "../utils/Enum";
import vehicleTypeRepository from "./VehicleType.repository";
import userRepository from './User.repository';
import { getDayofMonth } from "../utils/helper";

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
        status: BookingStatus.onWaiting,
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

  getBookingById: async (id: string) => {
    const booking = await bookingRepo.findOne({
      where: {
        id
      },
      relations: {
        kid: {
          parent: true
        },
        driver: true,

      }
    })

    if (booking) {
      return booking
    }
    return null
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

    const driverList = await driverRepositoty.getDriverActive();

    driverList.map(driver => {
      const socketId = global._mapList.get(driver.id)

      global._io.to(socketId).emit('new_booking', {
        message: "Have a new request",
        data: booking
      })
    })

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

    const userId = booking?.kid?.parent?.id
    console.log('userId => ', userId)
    const socketId = global._mapList.get(userId)
    console.log('socket id =>', socketId)
    bookingRepo.merge(booking, {
      driver: driver,
      status: BookingStatus.onWayPickUp,
    });
    await driverRepositoty.updateStatus(driverId, DriverStatus.onRide);
    global._io.to(socketId).emit('accept_booking', {
      message: "Your booking has a driver",
      data: driver
    })
    return await bookingRepo.save(booking);
  },

  updatePickUp: async (id: string) => {
    const booking = await bookingRepo.findOne({
      where: {
        id
      },
      relations: {
        kid: {
          parent: true,
        },
        driver: {
          vehicle: true,
        },
      }
    })
    bookingRepo.merge(booking, { status: BookingStatus.onRide });

    const userId = booking?.kid?.parent?.id
    console.log('userId => ', userId)
    const socketId = global._mapList.get(userId)
    console.log('socket id =>', socketId)

    await global._io.to(socketId).emit('picked_up', {
      message: "Your kid has picked up"
    })

    return await bookingRepo.save(booking)
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
    bookingRepo.merge(booking, { status: BookingStatus.completed });
    await driverRepositoty.updateStatus(booking.driver.id, DriverStatus.active);

    const userId = booking?.kid?.parent?.id
    console.log('userId => ', userId)
    const socketId = global._mapList.get(userId)
    console.log('socket id =>', socketId)

    await global._io.to(socketId).emit('completed', {
      message: "Your child has arrived safely"
    })
    return await bookingRepo.save(booking);
  },

  deleteBooking: async (id: string) => {
    const booking = await bookingRepo.findOneBy({ id });

    if (booking) {
      return await bookingRepo.delete(booking)
    }
    return false
  },

  statistical: async () => {
    const bookingList = await bookingRepo.find();

    const result = new Array(12).fill(0);

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
    bookingList?.reduce((value, currValue) => {
      const { startTime } = currValue
      const index = startTime.getMonth();

      result[index] += 1;
      return value;
    }, [])
    return { total, count, result }
  },


  statisticalByDate: async (date: Date) => {
    const booking = await bookingRepo.createQueryBuilder("booking").where("Date(booking.startTime) = :date", { date }).leftJoinAndSelect('booking.kid', 'kid').leftJoinAndSelect('booking.driver', 'driver').getMany();
    const countBooking = booking.length;

    const total = booking?.reduce((value, currentValue) => {
      return value + currentValue.fee
    }, 0)
    return { booking, countBooking, total }
  },


  statisticalByMonth: async (month: number, year: number) => {

    const numberDayorMonth = getDayofMonth(year, month)

    const countBooking = new Array(numberDayorMonth).fill(0);

    const totalPriceBooking = new Array(numberDayorMonth).fill(0);

    const booking = await bookingRepo.createQueryBuilder("booking")
      .where("YEAR(booking.startTime) = :year AND MONTH(booking.startTime) = :month", { year, month })
      .getMany();

    const quantityBooking = booking.length;

    const total = booking?.reduce((value, currValue) => {
      const { startTime } = currValue
      const index = startTime.getDate();
      countBooking[index] += 1;
      totalPriceBooking[index] += currValue.fee;
      return value + currValue.fee;
    }, 0)

    return { total, countBooking, totalPriceBooking, quantity: quantityBooking }
  }
};

export default bookingRepository;
