import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User.entity";
import { Kid } from "./entities/Kid.entity";
import { Booking } from "./entities/Booking.entity";
import { Driver } from "./entities/Driver.entity";
import { VehicleInfo } from "./entities/VehicleInfo.entity";
import { VehicleType } from "./entities/VehicleType.entity";
import { Payment } from "./entities/Payment.entity";
import { Administrator } from "./entities/Administrator.entity";
import { Account } from "./entities/Account.entity";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.HOST,
  port: Number(process.env.PORT),
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: false,
  entities: [
    User,
    Kid,
    Booking,
    Driver,
    VehicleInfo,
    VehicleType,
    Payment,
    Administrator,
    Account,
  ],
  migrations: [],
  subscribers: [],
});
