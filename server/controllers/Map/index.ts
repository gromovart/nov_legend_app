import { IDecoratedRequest } from '../../utils/App';
import app from '../../app';
import AuthServices from '../../services/Auth';

export default {
  signUpUser: async (
    request: IDecoratedRequest<{
      firstName: string;
      lastName: string;
      middleName: string;
      login: string;
      password: string;
      isActive: boolean;
    }>
  ): Promise<any> => {
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
};
