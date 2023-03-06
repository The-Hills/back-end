import { AccountType, DriverStatus, Gender } from "./Enum";
import { VehicleInfo } from "./../entities/VehicleInfo.entity";
import { Booking } from "./../entities/Booking.entity";
import { Payment } from "./../entities/Payment.entity";
import { VehicleType } from "./../entities/VehicleType.entity";

export interface RegisterUserPayload {
  email: string;
  phone: string;
  password: string;
  name: string;
  gender: Gender;
  avatar: string;
  role: AccountType;
}

export interface loginPayload {
  email: string;
  password: string;
}

export interface IDriver {
  email: string;
  password: string;
  name: string;
  role: AccountType;
  phone: string;
  gender: Gender;
  status: DriverStatus;
  avatar: string;
  rating: number;
  cardId: number;
  driverLicense: string;
  vehicle: VehicleInfo;
  booking: Booking;
  currentLocation: ILocation;
  isVerify: boolean;
}

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface PayloadVehicle {
  vehicleName: string;
  vehicleColor: string;
  licensePlates: string;
  vehicleImage: string;
  type: string;
  driverId: string;
}

export interface PayloadBooking {
  distance: number;
  fee: number;
  startLocation: string;
  endLocation: string;
  startPosition: ILocation;
  endPosition: ILocation;
  payment: Payment;
  driverId: string;
  kidId: string;
  status: string;
  typeVehicle: string;
}

export interface PayloadAdmin {
  name: string;
  email: string;
  password: string;
  role: AccountType;
}
