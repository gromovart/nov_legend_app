import bcrypt from 'bcryptjs';
import app from '../../../app';
import Sessions from '../../../database/entities/Sessions';
import User from '../../../database/entities/User';
import { BadRequestError } from '../../../utils/errors';

type SignInUserInterface = {
  payload: {
    login: string;
    password: string;
  };
  relations?: {};
};
export default class Service {
  public static readonly nameService = 'SignIn';

  private static checkPassword = async (password, passwordHash) => {
    try {
      return bcrypt.compare(password, passwordHash);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  public signIn = async (
    params: SignInUserInterface,
    requestMeta: any = {}
  ): Promise<Object | Error> => {
    const {
      payload: { login, password },
    } = params;

    const userRepo = app.connection.getRepository(User);

    const userCheck = await userRepo.findOne({
      select: ['id', 'password', 'login', 'isActiv'],
      where: { login },
    });

    if (!userCheck) {
      throw new BadRequestError(
        'Произошла ошибка! Не удалось найти пользователя!'
      );
    }

    const hashUserPassword = userCheck.password;

    if (!(await Service.checkPassword(password, hashUserPassword))) {
      throw new BadRequestError('Произошла ошибка! Введен не верный пароль!');
    }

    if (!userCheck.isActiv) {
      throw new BadRequestError(
        'Произошла ошибка! Учетная запись заблокирована!'
      );
    }

    const sessionsRepo = app.connection.getRepository(Sessions);

    const sessionInstance = new Sessions();

    const sesionData = sessionsRepo.merge(sessionInstance, {
      user: userCheck,
    });

    const session = await sessionsRepo.save(sesionData);

    const response = await sessionsRepo.findOne({
      where: { id: session.id },
      relations: ['user', 'user.profile'],
    });

    if (!response) {
      throw new BadRequestError(
        'Произошла ошибка! Не удалось добавить нового пользователя!'
      );
    }
    const {
      user: { profile },
    } = response;

    if (profile) {
      const { lastName, firstName, id: profileId } = profile;
      return {
        id: response.user.id,
        token: response.token,
        login,
        lastName,
        firstName,
        profileId,
      };
    }

    const { token } = session;

    if (!session) {
      throw new BadRequestError('Произошла ошибка! Не удалось создать сессию!');
    }

    const profileData = await userRepo.findOne({
      relations: ['profile'],
      where: { login },
    });

    const permissions = await userRepo.findOne({
      select: ['id'],
      relations: [
        'userRoleInterface',
        'userRoleInterface.role',
        'userRoleInterface.interfaces',
      ],
      where: { login },
    });

    if (!profileData) {
      throw new BadRequestError(
        'Произошла ошибка! Не удалось получить данные пользователя!'
      );
    }
    return {
      userData: {
        id: userCheck.id,
        login: userCheck.login,
        token,
        profileId: profileData.profile.id,
        firstName: profileData.profile.firstName,
        lastName: profileData.profile.lastName,
        isActiv: profileData.isActiv,
        permissions,
      },
    };
  };
}
