import app from '../../../app';
import Sessions from '../../../database/entities/Sessions';
import User from '../../../database/entities/User';
import { BadRequestError } from '../../../utils/errors';
import * as Dictionary from '../../../utils/Dictionary';

type AuthUserInterface = {
  token: string;
  headers: any;
  relations?: {};
};
export default class Service {
  public static readonly nameService = 'AuthUser';

  public authUser = async (
    params: AuthUserInterface,
    requestMeta: any = {}
  ): Promise<Object | Error> => {
    console.log('AuthUserInterface');
    const { token } = params;
    const sessionsRepo = app.connection.getRepository(Sessions);

    const session = await sessionsRepo.find({
      order: { created: 'DESC' },
      where: { token },
      relations: ['user'],
    });

    if (!session) {
      return {
        isValid: false,
        credentials: {
          scope: [],
          token: '',
          user: {},
        },
      };
    }

    const lastSession = session[0];
    const userData = lastSession.user;

    const userRepo = app.connection.getRepository(User);

    const permissions = await userRepo.findOne({
      select: ['id'],
      relations: [
        'userRoleInterface',
        'userRoleInterface.role',
        'userRoleInterface.organization',
        'userRoleInterface.interfaces',
      ],
      where: { id: userData.id },
    });

    if (!permissions) {
      return new BadRequestError(
        'Произошла ошибка! Не удалось получить данные пользователя!'
      );
    }

    const profileData = await userRepo.findOne({
      relations: ['profile'],
      where: { id: userData.id },
    });

    if (!profileData) {
      return new BadRequestError(
        'Произошла ошибка! Не удалось получить данные пользователя!'
      );
    }

    const { role } = permissions.userRoleInterface;

    const isSuperUser = Dictionary.role.superuser === role.name;
    const isContentManager = Dictionary.role.contentManager === role.name;

    const userCredentialsObj = {
      id: userData.id,
      login: userData.login,
      firstName: profileData.profile.firstName,
      lastName: profileData.profile.lastName,
      isActiv: userData.isActiv,
      isSuperUser,
      isContentManager,
    };

    return {
      isValid: true,
      credentials: {
        scope: [role.name],
        token,
        user: {
          userData: userCredentialsObj,
          session: lastSession,
          permissions,
        },
      },
    };
    return {};
  };
}
