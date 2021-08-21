import app from '../../../app';
import MapCategory from '../../../database/entities/MapCategory';

export default class Service {
  public static readonly nameService = 'GetAllMapCategory';

  public getAllMapCategory = async (
    params: any,
    requestMeta: any = {}
  ): Promise<any> => {
    const responseCondition = app.connection
      .getRepository(MapCategory)
      .createQueryBuilder('mapCategory')
      .addOrderBy('mapCategory.title', 'ASC');

    const response = await responseCondition.getMany();

    return response;
  };
}
