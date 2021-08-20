export enum status {
  new = '1',
  inWork = '2',
  suspended = '3',
  refused = '4',
  completed = '5',
  visited = '6',
  notVisited = '7',
}
export enum type {
  // Заявка на курс через краткую форму
  entryСourse = '1',
  // Заявка через анкету кнопка "Хочу тут работать"
  applicationPosition = '2',
  // Заявка через анкету кнопка "Расказать о себе"
  questionnaire = '3',
  // Обратная связь от пользователя через краткую форму
  feedbackUser = '4',
  // Регистрация организации
  organizationRegistration = '5',
  // Обратная связь от представителя организации через краткую форму
  organizationFeedback = '6',
  // Регистрация новго пользователя
  newUserRegistration = '7',
  // Отклик на вакансию с через анкету
  vacancyResponse = '8',
  // Заявка на курс через анкету
  courseResponse = '9',
  // Заявка на аналитику
  analytics = '10',
  // Заявка через анкету кнопка "Рассказать о себе" в разделе учёба
  universities = '11',
  // Заявка через анкету кнопка "Хочу тут учиться"
  wantToStudyHere = '12',
  // Заявка на платформе csp через раздел Моя заявка
  cspWithDocs = '13',
  // Заявка на мероприятие через анкету
  entryEvent = '14',
}

export enum typeContact {
  phone = 'phone',
  email = 'email',
  site = 'site',
}

export enum typeInstitution {
  university = 'university',
  college = 'college',
  school = 'school',
  createByUser = 'createByUser',
}

export enum roleInProject {
  customer = 'Заказчик',
  curator = 'Куратор АИП',
  sro = 'СРО',
  contractor = 'Подрядчик',
}

export enum statusDoc {
  new = 'new',
  inWork = 'inWork',
  accepted = 'accepted',
  refused = 'refused',
}

export enum role {
  normalUser = 'normalUser',
  administrator = 'administrator',
  superuser = 'superUser',
  contentManager = 'contentManager',
}

export enum uiType {
  normalUser = 'normalUser',
  educationalPlatform = 'educationalPlatform',
  itСompany = 'itСompany',
  superuser = 'superUser',
  contentManager = 'contentManager',
}
