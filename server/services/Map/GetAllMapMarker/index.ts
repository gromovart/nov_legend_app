import app from '../../../app';
import MapMarker from '../../../database/entities/MapMarker';

export default class Service {
  public static readonly nameService = 'GetAllMapMarker';

  public getAllMapMarker = async (
    params: any,
    requestMeta: any = {}
  ): Promise<any> => {
    const {
      query: { mapCategoryId },
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
      .addOrderBy('mapMarker.lat', 'DESC')
      .addOrderBy('mapMarker.long', 'DESC');

    if (mapCategoryId) {
      responseCondition
        .leftJoin('mapMarker.mapCategoryMapMarker', 'mapCategoryMapMarker')
        .leftJoin('mapCategoryMapMarker.mapCategory', 'mapCategory')
        .where('mapCategory.id = :mapCategoryId', { mapCategoryId });
    }

    const response = await responseCondition.getMany();

    return response;
  };
}
