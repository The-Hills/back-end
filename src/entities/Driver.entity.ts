import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {gender} from "../utils/Enum";

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  gender: gender;

  @Column()
  avatar: string;

  @Column()
  rating: number;

  @Column()
  vehicleId: number;

  @Column()
  cardId: number;

  @Column()
  driverLicense: string;
}
