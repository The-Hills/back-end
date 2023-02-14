import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "./Account.entity";

@Entity()
export class Administrator {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToOne(() => Account)
  @JoinColumn()
  account: Account;
}
