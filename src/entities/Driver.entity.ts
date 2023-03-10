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
    default: "https://the-hills.s3.ap-northeast-1.amazonaws.com/user/avatar.png",
  })
  avatar: string;

  @Column({
    type: 'int',
    default: 0,
    nullable: true,
  })
  rating: number;

  @Column()
  cardId: number;

  @Column()
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

  @OneToOne(() => Account, (account) => account.driver, { onDelete: "CASCADE" })
  @JoinColumn()
  account: Account;

  @OneToOne(() => VehicleInfo, { onDelete: "CASCADE" })
  @JoinColumn()
  vehicle: VehicleInfo;

  @OneToMany(() => Booking, (booking) => booking.driver)
  booking: Booking[];
}
