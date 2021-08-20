import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('region')
export default class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  title: string;

  @Column({ type: 'varchar', default: '', nullable: true })
  description: string;
}
