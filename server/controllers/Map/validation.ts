import _ from 'lodash';
import * as Joi from 'typesafe-joi';
import * as Dictionary from '../../utils/Dictionary';
import * as E from '../../utils/enums';

export const idParams = Joi.object()
  .keys({
    id: Joi.number()
      .required()
      .description('Общий базовый тип для ID сущностей'),
  })
  .required();

export const seoUrlParams = Joi.object().keys({
  seoUrl: Joi.string()
    .required()
    .description('Общий базовый тип для SEOURL сущностей'),
});

export const readListQuery = Joi.object({
  offset: Joi.number()
    .optional()
    .description('С какой позиции запросить данные'),
  limit: Joi.number().max(100).optional().description('Количество объектов'),
})
  .description('Общий базовый тип для пагинации')
  .required()
  .unknown(false);

export enum isActive {
  true = 'true',
  false = 'false',
}

export const findQuery = Joi.object().keys({
  text: Joi.string().required().description('Поиск по слову или символам'),
});
export const findOptionalQuery = Joi.object().keys({
  text: Joi.string().optional().description('Поиск по слову или символам'),
});

export const findCourseQuery = Joi.object().keys({
  text: Joi.string().optional().description('Поиск по слову или символам'),
  organizationId: Joi.number()
    .optional()
    .description('Id организации, которой принадлежат курсы'),
});

export const filterTagQuery = Joi.object().keys({
  filterTag: Joi.array()
    .single()
    .items(Joi.number().required())
    .optional()
    .description('Массив идентификаторов фильтр-тегов'),
});

export const sorting = Joi.string().valid('ASC', 'DESC').optional();

export const sortingForProfiles = Joi.object({
  orderByDirectionDevelop: sorting,
  orderByPercentageCompliance: sorting,
  orderByCreated: sorting,
});

export const regionUrl = Joi.object({
  regionUrl: Joi.string().optional().description('Url региона'),
});

export const newRegionUrl = Joi.object({
  regionUrl: Joi.string().optional().description('Url региона'),
});

export const platform = Joi.object({
  platform: Joi.string()
    .valid(..._.values(E.platform))
    .example(E.platform.hibrain)
    .optional(),
})
  .optional()
  .description('Наименование платформы');

export const extension = Joi.object({
  extension: Joi.string()
    .valid(..._.values(E.extensionMimeType))
    .example(E.extensionMimeType.rar)
    .required(),
})
  .required()
  .description('Доступные расширения для загрузки');

export const optionsDataErrorGenerator = Joi.object({
  typeError: Joi.string()
    .required()
    .description(
      'Тип ошибки. Указать каким сервисом сгенерировано исключение. Базой данных, внешним сервисом, базовый тип'
    ),
  meta: Joi.object()
    .optional()
    .description('Объект для добавления дополнительной информации'),
});

export const mapName = Joi.object({
  mapName: Joi.string()
    .valid(..._.values(Dictionary.mapName))
    .example(Dictionary.mapName.itCompany)
    .required()
    .description('Название карты'),
});

// MapMarker
export const findMapMarkerQuery = Joi.object({
  mapCategoryId: Joi.number().optional().example([1]),
  state: Joi.string().optional(),
})
  .concat(findOptionalQuery)
  .concat(readListQuery)
  .concat(mapName);

export const getAllMapMarkerQuery = Joi.object({
  lat1: Joi.number().required(),
  lat2: Joi.number().required(),
  long1: Joi.number().required(),
  long2: Joi.number().required(),
  zoomLevel: Joi.number().required().min(4).max(18),
  mapCategoryId: Joi.number().optional().example([1]),
  state: Joi.string().optional(),
})
  .concat(V.mapName)
  .concat(V.findOptionalQuery);

export const readMarkerParams = idParams;

// MapCategory
export const mapCategoryQuery = mapName;
export const updateMapCategoryParams = idParams;
export const updateMapCategoryPayload = Joi.object({
  regions: Joi.array()
    .items(Joi.number().required())
    .optional()
    .example([1, 2]),
});
