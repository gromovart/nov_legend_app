import { MAP_MAX_DETAIL } from '../../../utils/constants';
import app from '../../../app';
import MapMarker from '../../../database/entities/MapMarker';

export default class Service {
  public static readonly nameService = 'GetAllMapMarker';

  public getAllMapMarker = async (
    params: any,
    requestMeta: any = {}
  ): Promise<any> => {
    const {
      query: { mapCategoryId: mapCategoryIds, text, zoomLevel },
    } = params;

    const responseCondition = app.connection
      .getRepository(MapMarker)
      .createQueryBuilder('mapMarker')
      .select([
        'mapMarker.id AS id',
        'mapMarker.lat AS lat',
        'mapMarker.long AS long',
        'mapMarker.name AS name',
        'mapMarker.audio AS audio',
        'mapMarker.video AS video',
        'mapMarker.shortDescription AS "shortDescription"',
        'mapMarker.description AS description',
        'mapMarker.documents AS documents',
        'mapMarker.informants AS informants',
        `array_remove(string_to_array(mapMarker.images, ','),'null') AS images`,
        `array_remove(
          array_agg(
            jsonb_strip_nulls(
              jsonb_build_object('id', "mapCategory"."id",
                                 'title',"mapCategory"."title"))), '{}'::jsonb) AS "mapCategories"`,
      ])
      .leftJoin('mapMarker.mapCategoryMapMarker', 'mapCategoryMapMarker')
      .leftJoin('mapCategoryMapMarker.mapCategory', 'mapCategory')
      .groupBy('mapMarker.id')
      .where('mapMarker.lat != 0 AND mapMarker.long != 0')
      .addOrderBy('mapMarker.lat', 'DESC')
      .addOrderBy('mapMarker.long', 'DESC');

    const totalCount = await responseCondition.getCount();

    responseCondition.andWhere((qb) => {
      const subQuery = qb
        .subQuery()
        .select('mapMarker.id')
        .from(MapMarker, 'mapMarker');

      if (zoomLevel < MAP_MAX_DETAIL) {
        subQuery
          .select('MIN(mapMarker.id)', 'id')
          .groupBy(`substr(mapMarker.s2_path, 1, ${zoomLevel + 1})`);
      }

      if (text) {
        subQuery.andWhere(`mapMarker.name ILIKE '%'||:text||'%'`, { text });
      }

      return `mapMarker.id IN ${subQuery.getQuery()}`;
    });

    if (mapCategoryIds) {
      responseCondition.andWhere('mapCategory.id IN(:...mapCategoryIds)', {
        mapCategoryIds,
      });
    }

    const response = await responseCondition.getRawMany();

    return {
      data: response,
      totalCount,
      count: response.length,
    };
  };
}
