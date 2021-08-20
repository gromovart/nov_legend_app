import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Sessions from './Sessions';
import Profile from './Profile';
import UserRoleInterface from './UserRoleInterface';

@Entity('user')
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, default: '', nullable: true })
  login: string;

  @Column({ type: 'varchar', default: '', nullable: true, select: false })
  password: string;

  @Column({ default: false, select: false })
  isDelete: boolean;

  @Column({ default: false })
  isActiv: boolean;

  @CreateDateColumn({ select: false })
  created: Date;

  @UpdateDateColumn({ select: false })
  updated: Date;

  /* Relations */

  @OneToMany(() => Sessions, (session: any) => session.user)
  sessions: Sessions[];

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile: Profile;

  @OneToOne(
    () => UserRoleInterface,
    (userRoleInterface) => userRoleInterface.user
  )
  userRoleInterface: UserRoleInterface;
}
