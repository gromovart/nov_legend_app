import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import UserRoleInterface from './UserRoleInterface';
import * as Dictionary from '../../../../types/auth-service/Dictionary';

@Entity({ name: 'role' })
export default class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: Dictionary.role;

  @Column({ type: 'varchar', nullable: true })
  alias: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @CreateDateColumn({ select: false })
  created: Date;

  @UpdateDateColumn({ select: false })
  updated: Date;

  /* Relations */

  @OneToMany(
    () => UserRoleInterface,
    (userRoleInterface) => userRoleInterface.role
  )
  userRoleInterface: UserRoleInterface[];
}
