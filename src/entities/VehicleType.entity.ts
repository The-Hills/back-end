import {
  Column,
  Entity,
  JoinColumn,
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

  @OneToOne(() => VehicleInfo, (vehicleInfo) => vehicleInfo.vehicleType)
  vehicleInfo: VehicleInfo;
}
