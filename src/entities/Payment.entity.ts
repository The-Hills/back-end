import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaymentStatus } from "../utils/Enum";
import { User } from "./User.entity";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  createDate: string

  @Column()
  paymentInfo: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.DOING
  })
  status: PaymentStatus
}
