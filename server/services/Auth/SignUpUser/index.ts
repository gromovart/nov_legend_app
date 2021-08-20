import { getConnection } from 'typeorm';
import bcrypt from 'bcryptjs';
import app from '../../../app';
import Contact from '../../../database/entities/Contact';
import Profile from '../../../database/entities/Profile';
import Role from '../../../database/entities/Role';
import User from '../../../database/entities/User';
import UserInterface from '../../../database/entities/UserInterfaces';
import UserRoleInterface from '../../../database/entities/UserRoleInterface';
import { BadRequestError } from '../../../utils/errors';
import * as Dictionary from '../../../utils/Dictionary';

type SignUpUserInterface = {
  payload: {
    firstName: string;
    lastName: string;
    middleName: string;
    login: string;
    password: string;
    isActive: boolean;
  };
  relations?: {};
};
export default class Service {
  public static readonly nameService = 'signUp';

  private static hashPassword = (
    saltRound: number,
    password: string
  ): Promise<any> => {
    try {
      const hashedPassword = new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRound, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      });

      return hashedPassword;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  public signUpUser = async (
    params: SignUpUserInterface,
    requestMeta: any = {}
  ): Promise<Object | Error> => {
    const {
      payload: { firstName, lastName, middleName, login, password, isActive },
    } = params;

    const hashedPassword = await Service.hashPassword(6, password);

    const foundUser = await app.connection.getRepository(User).findOne({
      where: { login },
    });
    if (foundUser) {
      return new BadRequestError(
        'Произошла ошибка! Пользователь с таким email уже существует!'
      );
    }
    // запускаем транзакцию на создание записи в таблицах: User, Profile, user_role_interface
    const responseTransaction = await getConnection().transaction(
      async (transactionalEntityManager) => {
        // проверка на наличие профиля по идентификации полей firstName, lastName и login
        const findEmail = await app.connection.getRepository(Contact).find({
          where: { type: 'email', value: login },
          relations: ['profile'],
        });
        let findProfile;
        let profileCreated;
        if (findEmail.length) {
          findProfile = findEmail.find(
            (elem) =>
              elem.profile &&
              elem.profile.firstName === firstName &&
              elem.profile.lastName === lastName
          );
          if (findProfile) {
            profileCreated = findProfile.profile;
          }
        }
        // если профиль не нашли, то создаём новый
        if (!profileCreated) {
          const profile = new Profile();
          const profileCreateObj = app.connection
            .getRepository(Profile)
            .merge(profile, {
              lastName,
              firstName,
              middleName,
            });
          // Создаём запись в таблице профиль
          profileCreated = await transactionalEntityManager.save(
            profileCreateObj
          );
        }

        if (!profileCreated) {
          throw new BadRequestError(
            'Произошла ошибка! Не удалось создать профиль пользователя!'
          );
        }

        // Получаем роль
        const role = await app.connection.getRepository(Role).findOne({
          where: { name: Dictionary.role.normalUser },
        });
        // Получаем тип интерфейса
        const interfaces = await app.connection
          .getRepository(UserInterface)
          .findOne({
            where: { name: Dictionary.uiType.normalUser },
          });

        const user = new User();

        app.connection.getRepository(User).merge(user, {
          login,
          password: hashedPassword,
          profile: profileCreated,
          isActiv: isActive || true,
        });

        const userCreated = await transactionalEntityManager.save(user);

        if (!userCreated) {
          throw new BadRequestError(
            'Произошла ошибка! Не удалось создать пользователя!'
          );
        }

        // Создаем запись в таблице ролей и интерфейсов пользователей
        const userRoleInterface = new UserRoleInterface();

        app.connection
          .getRepository(UserRoleInterface)
          .merge(userRoleInterface, {
            role,
            interfaces,
            user,
          });
        const userRoleInterfaceCreated = await transactionalEntityManager.save(
          userRoleInterface
        );

        if (!userRoleInterfaceCreated) {
          throw new BadRequestError(
            'Произошла ошибка! Не удалось создать роль пользователя!'
          );
        }
        return { userCreated, profileCreated };
      }
    );

    const permissions = await app.connection.getRepository(User).findOne({
      select: ['id'],
      relations: [
        'userRoleInterface',
        'userRoleInterface.role',
        'userRoleInterface.interfaces',
      ],
      where: { id: responseTransaction.userCreated.id },
    });

    if (!permissions) {
      return new BadRequestError(
        'Произошла ошибка! Не удалось получить данные пользователя!'
      );
    }
    return {
      userData: {
        id: responseTransaction.userCreated.id,
        login: responseTransaction.userCreated.login,
        firstName: responseTransaction.profileCreated.firstName,
        lastName: responseTransaction.profileCreated.lastName,
        isActiv: responseTransaction.userCreated.isActiv,
        permissions,
      },
    };
  };
}
