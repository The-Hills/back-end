import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { gender } from "../utils/Enum";
import { Kid } from "./Kid.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  idAccount: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  gender: gender;

  @Column()
  avatar: string;

  @OneToOne(() => Kid, (kid) => kid.parent)
  kid: Kid;
}
