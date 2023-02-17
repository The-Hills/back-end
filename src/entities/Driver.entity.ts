import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DriverStatus, Gender } from "../utils/Enum";
import { Account } from "./Account.entity";
import { Booking } from "./Booking.entity";
import { VehicleInfo } from "./VehicleInfo.entity";

@Entity()
export class Driver {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  gender: Gender;

  @Column()
  phone: string;

  @Column({
    type: "enum",
    enum: DriverStatus,
    default: DriverStatus.unActive,
  })
  status: DriverStatus;

  @Column({
    default: "avatar.png",
  })
  avatar: string;

  @Column()
  rating: number;

  @Column()
  cardId: number;

  @Column()
  driverLicense: string;

  @OneToOne(() => Account, (account) => account.driver, { onDelete: "CASCADE" })
  @JoinColumn()
  account: Account;

  @OneToOne(() => VehicleInfo)
  @JoinColumn()
  vehicle: VehicleInfo;

  @OneToMany(() => Booking, (booking) => booking.dirver)
  booking: Booking[];
}
