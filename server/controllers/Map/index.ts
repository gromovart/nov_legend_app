import * as Hapi from '@hapi/hapi';
import { controllers } from '../../../../controllers/Storage/MapCategory';
import * as V from './validation';
import { Strategies } from '../Auth/Strategies/interfaces';
import * as Dictionary from '../../utils/Dictionary';

const mapCategory: Hapi.ServerRoute[] = [
  {
    method: 'GET',
    path: '/map-category',
    handler: controllers.getAll,
    options: {
      cors: true,
      validate: {
        query: <any>V.mapCategoryQuery,
      },
      tags: ['api', 'mapCategory'],
      description: 'Получить все категории каталога карты',
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
    method: 'PUT',
    path: '/admin/map-category/{id}',
    handler: controllers.update,
    options: {
      auth: {
        strategies: [Strategies.staticJWT, Strategies.static],
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
    handler: controllers.find,
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
    handler: controllers.getAll,
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
    handler: controllers.get,
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

export default mapCategory;
