import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { VehicleType } from "./VehicleType.entity";

@Entity()
export class VehicleInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  vehicleTypeId: number;

  @Column()
  vehicleName: string;

  @Column()
  vehicleColor: string;

  @Column()
  licensePlates: string;

  @OneToOne(() => VehicleType)
  @JoinColumn()
  vehicleType: VehicleType;
}
