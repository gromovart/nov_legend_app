import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import MapMarker from './MapMarker';

@Entity('map_marker_education')
export default class MapMarkerEducation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: true })
  ageFrom: number;

  @Column({ type: 'integer', nullable: true })
  ageTo: number;

  @Column({ type: 'varchar', nullable: true })
  url: string;

  @Column({ type: 'varchar', nullable: true })
  partner: string;

  @Column({ type: 'varchar', nullable: true })
  educationForm: string;

  @Column({ type: 'varchar', nullable: true })
  countGroup: string;

  @Column({ type: 'varchar', nullable: true })
  teachers: string;

  @Column({ type: 'varchar', nullable: true })
  significantProject: string;

  // Relations

  @OneToOne(() => MapMarker, (mapMarker) => mapMarker.mapMarkerEducation)
  @JoinColumn()
  mapMarker: MapMarker;
}
