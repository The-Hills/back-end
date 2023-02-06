import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VehiclePrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vehicleTypeId: number;

  @Column()
  fee: number;
}
