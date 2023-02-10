import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Gender } from "../utils/Enum";
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
  avatar: string;

  @Column()
  rating: number;

  @Column()
  cardId: number;

  @Column()
  driverLicense: string;

  @OneToOne(() => VehicleInfo)
  @JoinColumn()
  vehicle: VehicleInfo;

  @OneToMany(() => Booking, (booking) => booking.dirver)
  booking: Booking[];
}
