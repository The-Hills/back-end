import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Gender } from "../utils/Enum";
import { User } from "./User.entity";
import { Booking } from "./Booking.entity";

@Entity()
export class Kid {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
  })
  name: string;

  @Column({
    type: "integer",
  })
  age: number;

  @Column({ type: "enum", enum: Gender, default: Gender.male })
  gender: Gender;

  @Column({
    type: "varchar",
    default: "https://the-hills.s3.ap-northeast-1.amazonaws.com/kid/avatar.png",
  })
  avatar: string;

  @Column({
    type: 'varchar',
    default: "QR code"
  })
  qr: string;

  @ManyToOne(() => User, (user) => user.kid, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  parent: User;

  @OneToMany(() => Booking, (booking) => booking.kid)
  booking: Booking[];
}
