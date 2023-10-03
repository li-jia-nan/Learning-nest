import { Coffee } from "./coffee.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany<Coffee>(() => Coffee, coffee => coffee.flavors)
  coffees: Coffee[];
}
