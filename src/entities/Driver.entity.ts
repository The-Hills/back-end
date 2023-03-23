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

  @Column({
    type: 'nvarchar'
  })
  name: string;

  @Column({
    type: "enum",
    enum: Gender,
    default: Gender.male,
  })
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
    default: "https://the-hills.s3.ap-northeast-1.amazonaws.com/driver/avatar.png",
  })
  avatar: string;

  @Column()
  cardId: number;

  @Column({
    default: 'https://the-hills.s3.ap-northeast-1.amazonaws.com/driver/license.png'
  })
  driverLicense: string;

  @Column({
    default: false,
  })
  isVerify: boolean;

  @Column({
    type: "point",
    nullable: true,
  })
  currentLocation: string;

  @Column({
    default: 0,
  })
  inCome: number;

  @OneToOne(() => Account, (account) => account.driver, { onDelete: "CASCADE" })
  @JoinColumn()
  account: Account;

  @OneToOne(() => VehicleInfo, { onDelete: "CASCADE" })
  @JoinColumn()
  vehicle: VehicleInfo;

  @OneToMany(() => Booking, (booking) => booking.driver)
  booking: Booking[];
}
