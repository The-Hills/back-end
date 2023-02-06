import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
} from "typeorm";
import { gender } from "../utils/Enum";
import { User } from "./User.entity";

@Entity()
export class Kid {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  gender: gender;

  @Column()
  avatar: string;

  @OneToOne(() => User, (user) => user.kid)
  parent: User;
}
