import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { status } from "../utils/Enum";
import { Driver } from "./Driver.entity";
import { Payment } from "./Payment.entity";
import { User } from "./User.entity";
import { Kid } from "./Kid.entity";

@Entity()
export class Booking {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  distance: number;

  @Column()
  fee: number;

  @Column()
  status: status;

  @Column("datetime")
  startTime: string;

  @Column("datetime")
  endTime: string;

  @Column({ type: "point" })
  startLocation: string;

  @Column({ type: "point" })
  endLocation: string;

  @OneToOne(() => Payment)
  @JoinColumn()
  payment: Payment;

  @ManyToOne(() => User, (user) => user.booking)
  user: User;

  @ManyToOne(() => Driver, (driver) => driver.booking)
  dirver: Driver;

  @ManyToOne(() => Kid, (kid) => kid.booking)
  kid: Kid;
}
