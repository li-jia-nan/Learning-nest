import { Logs } from 'src/logs/logs.entiy';
import { Roles } from 'src/roles/roles.entiy';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entiy';

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

  @OneToOne(() => Profile, profile => profile.user)
  profile: Profile;
}
