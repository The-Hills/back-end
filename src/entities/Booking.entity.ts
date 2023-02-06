import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { status } from "../utils/Enum";

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  driverId: number;

  @Column()
  kidId: number;

  @Column()
  paymentId: number;

  @Column()
  distance: number;

  @Column()
  fee: number;

  @Column()
  status: status;

  @Column('datetime')
  startTime: string;

  @Column('datetime')
  endTime: string;

  @Column({ type: "point" })
  startLocation: string;

  @Column({ type: "point" })
  endLocation: string;
}
