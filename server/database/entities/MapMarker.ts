import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  Index,
  OneToOne,
} from 'typeorm';

import MapCategoryMapMarker from './MapCategoryMapMarker';
import Map from './Map';
import MapMarkerEducation from './MapMarkerEducation';

@Entity('map_marker')
export default class MapMarker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'double precision', nullable: false })
  lat: number;

  @Column({ type: 'double precision', nullable: false })
  long: number;

  @Column({ type: 'varchar', nullable: false })
  s2_path: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  houseNumber: string;

  @Column({ type: 'varchar', nullable: true })
  road: string;

  @Column({ type: 'varchar', nullable: true })
  city: string;

  @Column({ type: 'varchar', nullable: true })
  state: string;

  @Column({ type: 'varchar', nullable: true })
  postcode: string;

  @Column({ type: 'varchar', nullable: true })
  site: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  logo: string;

  @CreateDateColumn({ type: 'timestamp without time zone', default: null })
  created: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone', default: null })
  updated: Date;

  // Relations

  @OneToMany(
    () => MapCategoryMapMarker,
    (mapCategoryMapMarker) => mapCategoryMapMarker.mapMarker
  )
  mapCategoryMapMarker: MapCategoryMapMarker[];

  @Index('mapId-idx')
  @ManyToOne(() => Map, (map) => map.mapMarkers)
  map: Map;

  @OneToOne(() => MapMarkerEducation, (mapMarkerEdu) => mapMarkerEdu.mapMarker)
  mapMarkerEducation: MapMarkerEducation;
}
