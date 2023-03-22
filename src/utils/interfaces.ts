import { AccountType, DriverStatus, Gender, PaymentStatus } from "./Enum";
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
  avatar: any;
  rating: number;
  cardId: number;
  driverLicense: any;
  vehicle: VehicleInfo;
  booking: Booking;
  currentLocation: ILocation;
  isVerify: boolean;
  vehicleName: string;
  vehicleColor: string;
  vehicleLicensePlates: string;
  vehicleType: string
}

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface PayloadVehicle {
  vehicleName: string;
  vehicleColor: string;
  licensePlates: string;
  type: string;
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

export interface PaymentPayload {

  amount: number,
  createDate: string,
  paymentInfo: string,
  status: PaymentStatus
}


interface ImagePayload {
  name: string,
  mimetype: string,
  size: number
}