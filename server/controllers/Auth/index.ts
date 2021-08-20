import { IDecoratedRequest, IToolKit } from '../../utils/App';
import app from '../../app';
import AuthServices from '../../services/Auth';

export default {
  signUpUser: async (request: IDecoratedRequest): Promise<any> => {
    const { payload } = request;
    try {
      return await AuthServices.signUpUser({
        payload,
      });
    } catch (e) {
      app.log.error(e);
      return app.generateHttpError(e);
    }
  },
  authUser: async (request: IDecoratedRequest, token: string): Promise<any> => {
    try {
      const { headers } = request;
      return await AuthServices.authUser({ headers, token });
    } catch (e) {
      app.log.error(e);
      return app.generateHttpError(e);
    }
  },
  signIn: async (request: IDecoratedRequest): Promise<any> => {
    try {
      const { payload } = request;

      const response = await AuthServices.signIn({ payload });
      return response;
    } catch (e) {
      app.log.error(e);
      return app.generateHttpError(e);
    }
  },
};
