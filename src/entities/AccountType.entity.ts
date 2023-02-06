import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AccountType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;
}


