import { v4 as uuidv4 } from 'uuid';
import { IDecoratedRequest, IToolKit } from '../../utils/App';
import app from '../../app';
import AuthServices from '../../services/Auth';

export default {
  signUpUser: async (request: IDecoratedRequest): Promise<any> => {
    try {
      return await AuthServices.signUpUser(
        {
          payload: {
            firstName: 'string',
            lastName: 'string',
            middleName: 'string',
            login: 'string',
            password: 'string',
          },
        },
        {}
      );
    } catch (e) {
      app.log.error(e);
      return app.generateHttpError(e);
    }
  },
  authUser: async (request: IDecoratedRequest, token: string): Promise<any> => {
    try {
      return await AuthServices.signUpUser(
        {
          payload: {
            firstName: 'string',
            lastName: 'string',
            middleName: 'string',
            login: 'string',
            password: 'string',
          },
        },
        {}
      );
    } catch (e) {
      app.log.error(e);
      return app.generateHttpError(e);
    }
  },
};
