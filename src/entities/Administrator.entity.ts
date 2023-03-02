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
  name: string;

  @OneToOne(() => Account, (account) => account.admin)
  @JoinColumn()
  account: Account;
}
