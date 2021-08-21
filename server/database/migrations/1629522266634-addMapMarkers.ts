import { MigrationInterface, QueryRunner } from 'typeorm';
import { jsonToArrayCustom, latLongToS2Path } from '../../utils/helpers';
import MapCategory from '../entities/MapCategory';
import MapCategoryMapMarker from '../entities/MapCategoryMapMarker';
import MapMarker from '../entities/MapMarker';

export class addMapMarkers1629522266634 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const { data } = await jsonToArrayCustom('database/dumps/data.json');
    const promises = data.map(async (category: any) => {
      const { district, objects } = category;

      const mapCategory = new MapCategory();
      mapCategory.title = district;
      mapCategory.innerName = district;

      const createdMapCategory = await queryRunner.manager.save(mapCategory);

      const markers = objects.map((_: any, i) => ({
        lat: _.lat || 0,
        long: _.long || 0,
        s2_path: latLongToS2Path(_.lat || 0, _.long || 0),
        shortDescription: _.shortDescription,
        description: _.description,
        documents: _.documents,
        informants: _.informants,
        name: _.title,
      }));

      const createdMapMarkers = await queryRunner.manager.save(
        MapMarker,
        markers
      );

      const mapMarkerMapCategoryRelations = createdMapMarkers.map(
        (createdMapMarker: any) => {
          const mapCategoryMapMarker = new MapCategoryMapMarker();
          mapCategoryMapMarker.mapCategory = createdMapCategory;
          mapCategoryMapMarker.mapMarker = createdMapMarker;
          return mapCategoryMapMarker;
        }
      );
      await queryRunner.manager.save(mapMarkerMapCategoryRelations);
    });

    await Promise.all(promises);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
