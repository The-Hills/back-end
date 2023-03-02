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
  password: string;

  @OneToOne(() => User, (user) => user.account)
  user?: User;

  @OneToOne(() => Driver, (driver) => driver.account)
  driver?: Driver;

  @OneToOne(() => Administrator, (admin) => admin.account)
  admin?: Administrator;
}
