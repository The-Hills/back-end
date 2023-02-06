import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idAccountType: number;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;
}
