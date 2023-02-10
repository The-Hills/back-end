import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AccountType } from "../utils/Enum";
import { User } from "./User.entity";
import { Driver } from "./Driver.entity";
import { Administrator } from "./Administrator.entity";

@Entity()
export class Account {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: AccountType,
    default: AccountType.user,
  })
  type: AccountType;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  access_tonken: string;

  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @OneToOne(() => Driver, { onDelete: "CASCADE" })
  @JoinColumn()
  driver: Driver;

  @OneToOne(() => Administrator, { onDelete: "CASCADE" })
  @JoinColumn()
  admin: Administrator;
}
