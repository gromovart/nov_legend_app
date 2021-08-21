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
      query: { mapCategoryId, text, zoomLevel },
    } = params;

    const responseCondition = app.connection
      .getRepository(MapMarker)
      .createQueryBuilder('mapMarker')
      .select([
        'mapMarker.id',
        'mapMarker.lat',
        'mapMarker.long',
        'mapMarker.name',
        'mapMarker.shortDescription',
        'mapMarker.description',
        'mapMarker.documents',
        'mapMarker.informants',
      ])
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

      if (mapCategoryId) {
        subQuery
          .leftJoin('mapMarker.mapCategoryMapMarker', 'mapCategoryMapMarker')
          .leftJoin('mapCategoryMapMarker.mapCategory', 'mapCategory')
          .andWhere('mapCategory.id =:mapCategoryId', { mapCategoryId });
      }

      if (text) {
        subQuery.andWhere(`mapMarker.name ILIKE '%'||:text||'%'`, { text });
      }

      return `mapMarker.id IN ${subQuery.getQuery()}`;
    });

    const response = await responseCondition.getMany();

    return {
      data: response,
      totalCount,
      count: response.length,
    };
  };
}
