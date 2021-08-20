import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

import Contact from './Contact';
import User from './User';
import Image from './Image';

@Entity('profiles')
export default class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  lastName: string;

  @Column({ type: 'varchar', nullable: false })
  firstName: string;

  @Column({ type: 'varchar', default: '', nullable: true })
  middleName: string;

  @Column({ type: 'varchar', default: '', nullable: true })
  dateBirth: Date;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  /* Relations */

  @OneToMany(() => Contact, (contact) => contact.profile)
  contacts: Contact[];

  @OneToMany(() => Image, (image) => image.profile)
  avatar: Image[];

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
