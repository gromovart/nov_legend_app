import { MigrationInterface, QueryRunner } from 'typeorm';
import { jsonToArrayCustom, latLongToS2Path } from '../../utils/helpers';
import MapCategory from '../entities/MapCategory';
import MapCategoryMapMarker from '../entities/MapCategoryMapMarker';
import MapMarker from '../entities/MapMarker';

export class addMapMarker1629566889987 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const { data } = await jsonToArrayCustom('database/dumps/data.json');
    const mapCategories = await queryRunner.manager.find(MapCategory);
    const mapCategoryIds = mapCategories.reduce(
      (resultObj: any, current: any) => ({
        ...resultObj,
        [current.innerName]: current.id,
      }),
      {}
    );

    const promises = data.map(async (e: any) => {
      const { objects } = e;

      const markers = objects.map(async (marker: any) => {
        const markerInstanse = new MapMarker();
        queryRunner.manager.merge(MapMarker, markerInstanse, {
          lat: marker.lat || 0,
          long: marker.long || 0,
          s2_path: latLongToS2Path(marker.lat || 0, marker.long || 0),
          shortDescription: marker.shortDescription,
          description: marker.description,
          documents: marker.documents,
          informants: marker.informants,
          images: marker.images,
          audio: marker.audio,
          video: marker.video,
          name: marker.title,
        });

        const createdMapMarker = await queryRunner.manager.save(markerInstanse);
        const mapCategoryId = mapCategoryIds[marker.category];

        if (mapCategoryId) {
          const mapCategoryMapMarker = new MapCategoryMapMarker();
          const mapCategory = new MapCategory();
          mapCategory.id = mapCategoryId;
          mapCategoryMapMarker.mapCategory = mapCategory;
          mapCategoryMapMarker.mapMarker = createdMapMarker;
          await queryRunner.manager.save(mapCategoryMapMarker);
        }
      });

      await Promise.all(markers);
    });
    await Promise.all(promises);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
