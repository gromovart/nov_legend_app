import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import MapCategory from './MapCategory';
import MapMarker from './MapMarker';

@Entity('map')
export default class Map {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  // Relations

  @ManyToMany(() => MapCategory, (mapCategory) => mapCategory.maps)
  @JoinTable({
    name: 'map_map_category',
    joinColumns: [{ name: 'mapId' }, { name: 'mapCategoryId' }],
  })
  mapCategories: MapCategory[];

  @OneToMany(() => MapMarker, (mapMarker) => mapMarker.map)
  mapMarkers: MapMarker[];
}
