import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AccountType } from "../utils/Enum";

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
}
