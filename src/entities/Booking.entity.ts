import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Raw,
} from "typeorm";
import { BookingStatus } from "../utils/Enum";
import { Driver } from "./Driver.entity";
import { Payment } from "./Payment.entity";
import { Kid } from "./Kid.entity";
import { Point } from "../utils/helper";

@Entity()
export class Booking {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  distance: number;

  @Column()
  fee: number;

  @Column({
    type: "enum",
    enum: BookingStatus,
    default: BookingStatus.onTracking,
  })
  status: BookingStatus;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  startTime: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
    onUpdate: "CURRENT_TIMESTAMP",
  })
  endTime: Date;

  @Column({
    type: "point",
    nullable: true,
  })
  startLocation: string;

  @Column({
    type: "point",
    nullable: true,
  })
  endLocation: string;

  @OneToOne(() => Payment)
  @JoinColumn()
  payment: Payment;

  @ManyToOne(() => Driver, (driver) => driver.booking)
  driver: Driver;

  @ManyToOne(() => Kid, (kid) => kid.booking)
  kid: Kid;
}
