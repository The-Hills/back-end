import { AccountType, DriverStatus, Gender } from "./Enum";
import { VehicleInfo } from "./../entities/VehicleInfo.entity";
import { Booking } from "./../entities/Booking.entity";

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
}

export interface ILocation {
  longitude: number;
  latitude: number;
}

export interface payloadVehicle {
  vehicleName: string;
  vehicleColor: string;
  licensePlates: string;
  type: string;
  driverId: string
}
