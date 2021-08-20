import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  ManyToOne,
} from 'typeorm';
import User from './User';

@Entity('sessions')
export default class Sessions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  @Generated('uuid')
  token: string;

  @CreateDateColumn({ type: 'timestamp without time zone', default: null })
  created: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone', default: null })
  updated: Date;

  @Column({ type: 'timestamp without time zone', default: null })
  deleted: Date;

  /* Relations */

  @ManyToOne(() => User, (user) => user.sessions)
  user: User;
}
