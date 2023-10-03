import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
