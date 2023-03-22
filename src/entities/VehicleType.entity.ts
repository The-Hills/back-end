import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { VehicleInfo } from "./VehicleInfo.entity";

@Entity()
export class VehicleType {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({
    type: "int",
  })
  price: number;

  @OneToMany(() => VehicleInfo, (vehicleInfo) => vehicleInfo.vehicleType)
  vehicleInfo: VehicleInfo[];
}
