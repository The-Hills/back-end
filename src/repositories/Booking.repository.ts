import { AppDataSource } from "./../data-source";
import { Booking } from "./../entities/Booking.entity";

const bookingRepo = AppDataSource.getRepository(Booking);

const bookingRepository = {};

export default bookingRepository;
