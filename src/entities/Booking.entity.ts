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
import { VehicleType } from "./VehicleType.entity";

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
    default: BookingStatus.onWaiting,
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
  startPosition: string;

  @Column({
    type: "point",
    nullable: true,
  })
  endPosition: string;

  @Column()
  startLocation: string;

  @Column()
  endLocation: string;

  @ManyToOne(() => VehicleType, (vehicle) => vehicle.vehicleInfo)
  @JoinColumn()
  vehicleType: VehicleType;

  @OneToOne(() => Payment)
  @JoinColumn()
  payment: Payment;

  @ManyToOne(() => Driver, (driver) => driver.booking)
  driver: Driver;

  @ManyToOne(() => Kid, (kid) => kid.booking)
  kid: Kid;
}
