import Joi from 'joi';
import AuthControllers from '../../controllers/Auth';

export default [
  {
    method: 'POST',
    path: '/sign-up',
    options: {
      validate: {
        payload: <any>Joi.object().keys({
          firstName: Joi.string().example('Иван').required(),
          lastName: Joi.string().example('Иванов').required(),
          login: Joi.string().example('ivan@mail.ru').required(),
          password: Joi.string().example('ivan').required(),
          age: Joi.number().example(30).required(),
          avatar: Joi.string().required(),
        }),
      },
      handler: AuthControllers.signUpUser,
      description: 'Регистрация пользователя',
      tags: ['api', 'auth'],
      plugins: {
        'hapi-swagger': {
          order: 2,
        },
        responses: {
          200: {
            description: 'Ошибок нет',
          },
          400: {
            description: 'Возвращает ошибку',
          },
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/sign-in',
    options: {
      validate: {
        payload: <any>Joi.object().keys({
          login: Joi.string().example('ivan@mail.ru').required(),
          password: Joi.string().example('ivan').required(),
        }),
      },
      handler: AuthControllers.signIn,
      description: 'Авторизация пользователя',
      tags: ['api', 'auth'],
      plugins: {
        'hapi-swagger': {
          order: 2,
        },
        responses: {
          200: {
            description: 'Ошибок нет',
          },
          400: {
            description: 'Возвращает ошибку',
          },
        },
      },
    },
  },
];
