import { Entity, ManyToOne, Column } from 'typeorm';
import MapMarker from './MapMarker';
import MapCategory from './MapCategory';

@Entity('map_category_map_marker')
export default class MapCategoryMapMarker {
  @ManyToOne(
    () => MapCategory,
    (mapCategory) => mapCategory.mapCategoryMapMarker,
    { primary: true, onDelete: 'CASCADE' }
  )
  mapCategory: MapCategory;

  @ManyToOne(() => MapMarker, (mapMarker) => mapMarker.mapCategoryMapMarker, {
    primary: true,
    onDelete: 'CASCADE',
  })
  mapMarker: MapMarker;

  @Column({ type: 'varchar', default: '', nullable: true })
  skills: string;
}
