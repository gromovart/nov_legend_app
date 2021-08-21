import Joi from 'joi';
import MapControllers from '../../controllers/Map';
import * as V from './validation';
import { Strategies } from '../../controllers/Auth/Strategies/interfaces';
import * as Dictionary from '../../utils/Dictionary';

export default [
  {
    method: 'GET',
    path: '/map-category',
    handler: async () => ({}),
    options: {
      cors: true,
      validate: {
        query: <any>V.mapCategoryQuery,
      },
      tags: ['api', 'mapCategory'],
      description: 'Получить все категории каталога карты',
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
    method: 'PUT',
    path: '/admin/map-category/{id}',
    handler: async () => ({}),
    options: {
      auth: {
        strategies: [Strategies.static],
        access: {
          scope: [Dictionary.role.superuser],
          entity: 'user',
        },
      },
      cors: true,
      validate: {
        params: <any>V.updateMapCategoryParams,
        payload: <any>V.updateMapCategoryPayload,
      },
      tags: ['api', 'mapCategory'],
      description: 'Обновить категорию каталога карты по ID',
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Успешное выполнение запроса',
            },
            400: {
              description: 'Возвращает ошибку',
            },
          },
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/map-marker/find',
    handler: async () => ({}),
    options: {
      cors: true,
      validate: {
        query: <any>V.findMapMarkerQuery,
      },
      tags: ['api', 'mapMarker'],
      description: 'Поиск маркеров карты',
      plugins: {
        'hapi-swagger': {
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
  },
  {
    method: 'GET',
    path: '/map-marker',
    handler: MapControllers.GetAll,
    options: {
      cors: true,
      validate: {
        query: <any>V.getAllMapMarkerQuery,
      },
      tags: ['api', 'mapMarker'],
      description: 'Получить все маркеры карты',
      plugins: {
        'hapi-swagger': {
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
  },
  {
    method: 'GET',
    path: '/map-marker/{id}',
    handler: async () => ({}),
    options: {
      cors: true,
      validate: {
        params: <any>V.readMarkerParams,
      },
      tags: ['api', 'mapMarker'],
      description: 'Получить маркер карты',
      plugins: {
        'hapi-swagger': {
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
  },
];
