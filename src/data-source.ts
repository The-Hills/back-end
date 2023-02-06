import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User.entity";
import { Kid } from "./entities/Kid.entity";
import { Booking } from "./entities/Booking.entity";
import { Driver } from "./entities/Driver.entity";
import { VehicleInfo } from "./entities/VehicleInfo.entity";
import { VehiclePrice } from "./entities/VehiclePrice.entity";
import { VehicleType } from "./entities/VehicleType.entity";
import { Payment } from "./entities/Payment.entity";
import { Administrator } from "./entities/Administrator.entity";
import { Account } from "./entities/Account.entity";
import { AccountType } from "./entities/AccountType.entity";
export const AppDataSource = new DataSource({
  ssl: "Amazon RDS",
  type: "mysql",
  host: "database-1.cziwnz9dwd78.ap-northeast-1.rds.amazonaws.com",
  port: 3306,
  username: "admin",
  password: "Thehills2023",
  database: "the_hills",
  synchronize: true,
  logging: false,
  entities: [
    User,
    Kid,
    Booking,
    Driver,
    VehicleInfo,
    VehiclePrice,
    VehicleType,
    Payment,
    Administrator,
    Account,
    AccountType,
  ],
  migrations: [],
  subscribers: [],
});
