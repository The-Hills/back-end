import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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
    default: 'https://the-hills.s3.ap-northeast-1.amazonaws.com/vehicle/vehicle.png'
  })
  vehicleImage: string;

  @OneToOne(() => Driver, (driver) => driver.vehicle)
  driver: Driver;

  @ManyToOne(() => VehicleType, (vehicleType) => vehicleType.vehicleInfo)
  vehicleType: VehicleType;
}
