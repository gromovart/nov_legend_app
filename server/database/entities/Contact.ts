import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import Profile from './Profile';
import * as Dictionary from '../../utils/Dictionary';

@Entity('contact')
@Unique(['value', 'profile'])
export default class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  type: Dictionary.typeContact;

  @Column({ type: 'varchar', nullable: false })
  value: string;

  @Column({ default: false, nullable: false })
  isLogin: boolean;

  @Column({ default: false })
  isDelete: boolean;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  /* Relations */

  @ManyToOne(
    () => Profile,
    (profile) => profile.contacts
    // { primary: true }
  )
  profile: Profile;
}
