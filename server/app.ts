// Hapi
import * as Hapi from '@hapi/hapi';
import * as HapiSwagger from 'hapi-swagger';
import * as HapiJWT from 'hapi-auth-jwt2';
import * as HapiBearer from 'hapi-auth-bearer-token';
import * as Boom from '@hapi/boom';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';

// libs
import * as path from 'path';
import Hemera from 'nats-hemera';
import Pino from 'pino';
import Nats from 'nats';
import axios, { AxiosInstance } from 'axios';
import _ from 'lodash';
import { constants as StatusCodes } from 'http2';
import * as Status from 'http-status-codes';

// Other
import * as I from '../../types/common/App';
import routesV1 from './routes/1_0';
import authService from './routes/1_0/Auth/Auth/strategies';
import { Strategies } from '../../types/api-service/Routes/Auth/Strategies/interfaces';
import { typeError as TypeError } from '../../types/common/enums';
import * as T from '../../types/common/types';
// import {
//   allowedHostsDev,
//   allowedHostsLoc,
//   allowedHostsProd,
//   allowedHostsStg,
// } from '../../constants';
// import { enumToArray } from '../../libs/helpers';

class App {
  // Vars
  private hemeraConnection: Hemera<Nats.Client, Hemera.Config>;

  private mvpApi: AxiosInstance;

  private analyticsApi: AxiosInstance;

  private natsConnection: Nats.Client;

  private logger: Pino.Logger;

  private server: Hapi.Server;

  public config: I.ProcessEnv;

  private error: Boom.Boom;

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
      switch (this.config.APP_NAME_ENV) {
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
          return { level: this.config.LOG_LEVEL };
        default:
          return {};
      }
    };

    const loggerConfig = getEnvironmentConfig();

    this.logger = Pino(loggerConfig);
  }

  private initNatsConnection() {
    this.natsConnection = Nats.connect({
      servers: [`${process.env.NATS_URI}`],
    });

    return this.natsConnection;
  }

  private initHemeraConnection() {
    this.hemeraConnection = new Hemera(this.nats, {
      logLevel: Number(process.env.TEST_MODE) ? 'error' : 'info',
      timeout: +(process.env.HEMERA_TIMEOUT || '2000'),
    });

    return this.hemeraConnection;
  }

  public get responseCode() {
    return Status;
  }

  public get nats() {
    return this.natsConnection;
  }

  public get hemera() {
    return this.hemeraConnection;
  }

  public get mvpApiInstance() {
    return this.mvpApi;
  }

  public get analyticsApiInstance() {
    return this.analyticsApi;
  }

  public get serverInstance() {
    return this.server;
  }

  public async stop() {
    return this.server.stop();
  }

  public get params(): I.ProcessEnv {
    return this.config;
  }

  private async initMvpApi() {
    this.mvpApi = axios.create({
      baseURL: `${process.env.MVP_API_BASE_URL}`,
    });
  }

  private async initAnalyticsApi() {
    this.analyticsApi = axios.create({
      baseURL: `${process.env.ANALYTICS_API_BASE_URL}`,
    });
  }

  public get log(): Pino.Logger {
    return this.logger;
  }

  public async start(env: any): Promise<Hapi.Server> {
    process.on('unhandledRejection', (err) => {
      const logger = this.log || console;
      logger.error('unhandledRejection', err);
    });

    this.config = {
      ...env,
    };

    try {
      this.initLogger();
      this.initNatsConnection();
      await this.initMvpApi();
      await this.initAnalyticsApi();
      this.initHemeraConnection();
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
            `http://${this.server.info.address}:${this.server.info.port}${this.params.ROUTE_PREFIX}/documentation`
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
      port: +this.params.SERVER_PORT,
      routes: {
        cors: {
          origin: ['*'],
          // origin: (this.config.APP_NAME_ENV === I.Environments.LOC && [
          //   ...enumToArray(allowedHostsLoc),
          //   ...enumToArray(allowedHostsDev),
          // ]) ||
          //   (this.config.APP_NAME_ENV === I.Environments.DEV && [
          //     ...enumToArray(allowedHostsLoc),
          //     ...enumToArray(allowedHostsDev),
          //   ]) ||
          //   (this.config.APP_NAME_ENV === I.Environments.STAGING && [
          //     ...enumToArray(allowedHostsStg),
          //   ]) ||
          //   (this.config.APP_NAME_ENV === I.Environments.PROD && [
          //     ...enumToArray(allowedHostsProd),
          //   ]) || ['*'],
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

    this.server.state('refreshToken', {
      ttl: 1000 * 60 * 60 * 24 * 30,
      isSecure: false,
      isHttpOnly: false,
      isSameSite: 'Strict',
      encoding: 'base64json',
      clearInvalid: true,
      strictHeader: true,
      path: '/',
      // domain: this.config.DOMAIN_COOKIE,
    });
    this.server.state('uid', {
      ttl: 1000 * 60 * 60 * 24 * 30 * 60,
      isSecure: false,
      isHttpOnly: false,
      isSameSite: 'Strict',
      encoding: 'base64json',
      clearInvalid: true,
      strictHeader: true,
      path: '/',
      // domain: this.config.DOMAIN_COOKIE,
    });

    await this.server.register([
      {
        plugin: HapiBearer,
      },
      {
        plugin: HapiJWT,
      },
      {
        plugin: Inert,
      },
      {
        plugin: Vision,
      },
    ]);

    if (this.config.APP_NAME_ENV !== I.Environments.PROD) {
      await this.server.register({
        plugin: HapiSwagger,
        options: <HapiSwagger.RegisterOptions>{
          info: {
            title: 'HIBRAIN',
            description: 'JSON REST API HIBRAIN',
            version: this.params.API_VERSION,
          },
          grouping: 'tags',
          tagsGroupingFilter: (tag) =>
            !['api', this.params.API_VERSION].includes(tag),
          schemes: [
            this.params.APP_NAME_ENV === I.Environments.LOC ? 'http' : 'https',
          ],
          documentationPath: `${this.params.ROUTE_PREFIX}/documentation`,
          jsonPath: `${this.params.ROUTE_PREFIX}/swagger.json`,
          swaggerUIPath: `${this.params.ROUTE_PREFIX}/swaggerui`,
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
    }

    const auth = authService({
      [I.EnvVars.JWT_SECRET]: this.params.JWT_SECRET,
      [I.EnvVars.JWT_LIFESPAN]: this.params.JWT_LIFESPAN,
      [I.EnvVars.JWT_ALGORITHM]: this.params.JWT_ALGORITHM,
      [I.EnvVars.REFRESH_LIFESPAN]: this.params.REFRESH_LIFESPAN,
    });
    this.server.auth.strategy(Strategies.static, 'bearer-access-token', {
      validate: auth[Strategies.static],
    });
    this.server.auth.strategy(Strategies.staticJWT, 'bearer-access-token', {
      validate: auth[Strategies.staticJWT],
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

    if (this.params.ROUTE_PREFIX !== '/')
      this.server.realm.modifiers.route.prefix = this.params.ROUTE_PREFIX;
    this.server.route(routesV1);
  }
}

export default new App();
