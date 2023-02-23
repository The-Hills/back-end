import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Gender } from "../utils/Enum";
import { Kid } from "./Kid.entity";
import { Booking } from "./Booking.entity";
import { Account } from "./Account.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ type: "enum", enum: Gender, default: Gender.male })
  gender: Gender;

  @Column({
    default: "avatar.png",
  })
  avatar: string;

  @OneToOne(() => Account, (account) => account.user, { onDelete: "CASCADE" })
  @JoinColumn()
  account: Account;

  @OneToMany(() => Kid, (kid) => kid.parent, {
    cascade: true,
  })
  kid: Kid[];
}
