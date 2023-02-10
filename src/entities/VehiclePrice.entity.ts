import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { VehicleType } from "./VehicleType.entity";

@Entity()
export class VehiclePrice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fee: number;

  @OneToOne(() => VehicleType)
  @JoinColumn()
  vehicleType: VehicleType;
}
