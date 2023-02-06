import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VehicleInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vehicleTypeId: number;

  @Column()
  vehicleName: string;

  @Column()
  vehicleColor: string;

  @Column()
  licensePlates: string;
}
