import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import Profile from './Profile';

@Entity('image')
export default class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  src: string;

  @CreateDateColumn({ type: 'timestamp without time zone', default: null })
  created: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone', default: null })
  updated: Date;

  @ManyToOne(() => Profile, (profile) => profile.avatar)
  profile: Profile;
}
