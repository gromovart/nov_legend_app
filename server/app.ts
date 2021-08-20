// Hapi
import * as Hapi from '@hapi/hapi';
import * as HapiSwagger from 'hapi-swagger';
import * as HapiBearer from 'hapi-auth-bearer-token';
import * as Boom from '@hapi/boom';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';

// libs
import * as path from 'path';
import Pino from 'pino';
import _ from 'lodash';
import { constants as StatusCodes } from 'http2';
import * as Status from 'http-status-codes';
import { Connection, createConnection } from 'typeorm';
import * as T from './utils/types';
import { typeError as TypeError } from './utils/enums';
import * as I from './utils/App';
import routesV1 from './routes';
import { Strategies } from './controllers/Auth/Strategies/interfaces';
import authService from './controllers/Auth/strategies';

// Other

class App {
  // Vars

  private logger: Pino.Logger;

  private server: Hapi.Server;

  private error: Boom.Boom;

  private db: Connection;

  // Methods
  public generateHttpError(
    errorData: any,
    data: T.optionsDataErrorGenerator = { typeError: TypeError.baseError }
  ) {
    const {
      statusCode = (errorData.output && errorData.output.statusCode) ||
        StatusCodes.HTTP_STATUS_SERVICE_UNAVAILABLE,
      message = errorData.toString(),
    } = errorData;
    if (data.typeError === TypeError.externalServiceError) {
      const transformError = errorData;
      transformError.output.payload.typeError = data.typeError;
      transformError.output.payload.externalError = data.meta;
      this.error = transformError;
      return this.error;
    }
    this.error = new Boom.Boom(message, { statusCode });
    return this.error;
  }

  private initLogger() {
    const getEnvironmentConfig: () => Pino.LoggerOptions = () => {
      switch (process.env.APP_NAME_ENV) {
        case I.Environments.LOC:
          return {
            prettyPrint: { colorize: true },
            level: 'debug',
            redact: {
              paths: ['request.body.file._data'],
              censor: 'too big to show',
            },
          };
        case I.Environments.PROD:
          return { level: process.env.LOG_LEVEL };
        default:
          return {};
      }
    };

    const loggerConfig = getEnvironmentConfig();

    this.logger = Pino(loggerConfig);
  }

  public get responseCode() {
    return Status;
  }

  public get connection() {
    return this.db;
  }

  public get serverInstance() {
    return this.server;
  }

  public async stop() {
    return this.server.stop();
  }

  public get log(): Pino.Logger {
    return this.logger;
  }

  private async initDB() {
    this.db = await createConnection();
    await this.db.runMigrations();
  }

  public async start(env: any): Promise<Hapi.Server> {
    process.on('unhandledRejection', (err) => {
      const logger = this.log || console;
      logger.error('unhandledRejection', err);
    });

    try {
      this.initLogger();
      await this.initDB();
      await this.initServer();
      await this.server.start();
      !Number(process.env.TEST_MODE) &&
        this.log.info(
          `Микросервис ${path.basename(
            __dirname,
            '/'
          )}: Успешно! Сервер запущен на http://${this.server.info.address}:${
            this.server.info.port
          }`
        );
      !Number(process.env.TEST_MODE) &&
        this.log.info(
          `Документация к  API доступна по адресу: ` +
            `http://${this.server.info.address}:${this.server.info.port}/api/documentation`
        );
    } catch (err) {
      const logger = this.log || console;
      if (this.server) {
        await this.server.stop();
      }
      logger.error(err);
    }

    return this.server;
  }

  private async initServer() {
    this.server = new Hapi.Server({
      port: 8888,
      routes: {
        cors: {
          origin: ['*'],
          credentials: true,
        },
        validate: {
          failAction: async (request, h, err) => {
            if (err) {
              throw Boom.badRequest(err.message);
            }
          },
          options: {
            abortEarly: false,
          },
        },
      },
    });

    await this.server.register([
      {
        plugin: HapiBearer,
      },
      {
        plugin: Inert,
      },
      {
        plugin: Vision,
      },
    ]);

    await this.server.register({
      plugin: HapiSwagger,
      options: <HapiSwagger.RegisterOptions>{
        info: {
          title: 'HIBRAIN',
          description: 'JSON REST API HIBRAIN',
          version: process.env.API_VERSION,
        },
        grouping: 'tags',
        tagsGroupingFilter: (tag) =>
          !['api', process.env.API_VERSION].includes(tag),
        schemes: [
          process.env.APP_NAME_ENV === I.Environments.LOC ? 'http' : 'https',
        ],
        documentationPath: `/api/documentation`,
        jsonPath: `/api/swagger.json`,
        swaggerUIPath: `/api/swaggerui`,
        securityDefinitions: {
          Bearer: {
            type: 'apiKey',
            name: 'Authorization',
            description: 'Bearer token',
            in: 'header',
          },
        },
        security: [{ Bearer: [] }],
      },
    });

    const auth = authService();

    this.server.auth.strategy(Strategies.static, 'bearer-access-token', {
      validate: auth[Strategies.static],
    });

    this.server.events.on('response', (request) => {
      const {
        info: { remoteAddress },
      } = request;
      const response = <Hapi.ResponseObject>request.response;
      const isSwagger = request.path.includes('/swagger');
      if (isSwagger) return true;
      const isDocumentation = request.path.includes('/documentation');
      !Number(process.env.TEST_MODE) &&
        this.log.info({
          request: {
            from: remoteAddress,
            to: `${request.method.toUpperCase()} ${request.path}`,
            headers: request.headers,
            body: request.payload,
          },
          response: {
            body: isDocumentation ? 'documentation' : 'response',
            statusCode:
              !_.isEmpty(response) && _.has(response, 'statusCode')
                ? response.statusCode
                : response,
          },
        });
      return true;
    });

    this.server.realm.modifiers.route.prefix = '/api';
    this.server.route(routesV1);
  }
}

export default new App();
