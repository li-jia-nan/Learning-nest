import { Logs } from 'src/logs/logs.entiy';
import { Roles } from 'src/roles/roles.entiy';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Logs, logs => logs.user)
  logs: Logs[];

  @ManyToMany(() => Roles, roles => roles.users)
  @JoinTable({ name: 'user_roles' })
  roles: Roles[];
}
