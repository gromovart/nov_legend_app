import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import * as Dictionary from '../../../../types/auth-service/Dictionary';
import UserRoleInterface from './UserRoleInterface';

@Entity({ name: 'user_interfaces' })
export default class UserInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: Dictionary.uiType;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @CreateDateColumn({ select: false })
  created: Date;

  @UpdateDateColumn({ select: false })
  updated: Date;

  @OneToMany(
    () => UserRoleInterface,
    (userRoleInterface) => userRoleInterface.interfaces
  )
  userRoleInterface: UserRoleInterface[];
}
