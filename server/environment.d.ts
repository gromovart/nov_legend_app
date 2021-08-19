declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      APP_NAME_ENV: 'dev' | 'prod' | 'loc' | 'staging';
      NATS_URI: string;
      HEMERA_TIMEOUT: string;
      API_VERSION: string;
      SERVER_PORT: string;
      ROUTE_PREFIX: string;
      JWT_ALGORITHM: string;
      JWT_SECRET: string;
      JWT_LIFESPAN: string;
      REFRESH_LIFESPAN: string;
      DB_TYPE: string;
      POSTGRES_HOST: string;
      POSTGRES_PORT: string;
      POSTGRES_DB: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      LOG_LEVEL: string;
      DOMAIN_COOKIE: string;
      REFRESH_TOKEN_LOCAL: string;
      MVP_API_BASE_URL: string;
      MVP_API_PORT_DEV: string;
      MVP_API_PORT_PROD: string;
      TEST_MODE: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
