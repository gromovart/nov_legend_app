import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Role from './Role';
import User from './User';
import UserInterfaces from './UserInterfaces';

@Entity({ name: 'user_role_interface' })
export default class UserRoleInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ select: false })
  created: Date;

  @UpdateDateColumn({ select: false })
  updated: Date;

  /* Relations */

  @ManyToOne(() => Role, (role) => role.userRoleInterface)
  role: Role;

  @OneToOne(() => User, (user) => user.userRoleInterface)
  @JoinColumn()
  user: User;

  @ManyToOne(() => UserInterfaces, (interfaces) => interfaces.userRoleInterface)
  interfaces: UserInterfaces;
}
