import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { VehicleType } from "./VehicleType.entity";
import { Driver } from "./Driver.entity";

@Entity()
export class VehicleInfo {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  vehicleName: string;

  @Column()
  vehicleColor: string;

  @Column()
  licensePlates: string;

  @Column({
    default: ''
  })
  vehicleImage: string;

  @OneToOne(() => Driver, (driver) => driver.vehicle)
  driver: Driver;

  @OneToOne(() => VehicleType)
  @JoinColumn()
  vehicleType: VehicleType;
}
