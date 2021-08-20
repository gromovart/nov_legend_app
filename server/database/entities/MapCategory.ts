import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

import MapCategoryMapMarker from './MapCategoryMapMarker';
import Map from './Map';

@Entity('map_category')
export default class MapCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  innerName: string;

  @Column({ type: 'integer', nullable: false, default: 0 })
  index: number;

  // Relations

  @OneToMany(
    () => MapCategoryMapMarker,
    (mapCategoryMapMarker) => mapCategoryMapMarker.mapCategory
  )
  mapCategoryMapMarker: MapCategoryMapMarker[];

  @ManyToMany(() => Map, (map) => map.mapCategories)
  maps: Map[];
}
