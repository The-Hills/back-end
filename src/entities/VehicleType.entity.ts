import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VehicleType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
