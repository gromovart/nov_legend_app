import app from '../../app';
import MapServices from '../../services/Map';

export default {
  GetAllMapMarker: async (request): Promise<any> => {
    const { query } = request;
    try {
      return await MapServices.GetAllMapMarker({
        query,
      });
    } catch (e) {
      app.log.error(e);
      return app.generateHttpError(e);
    }
  },
  GetAllMapCategory: async (request): Promise<any> => {
    try {
      return await MapServices.GetAllMapCategory({});
    } catch (e) {
      app.log.error(e);
      return app.generateHttpError(e);
    }
  },
};
