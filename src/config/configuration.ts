export const RequiredEnvVars = ['DB_NAME', 'SERVER_PORT'];

// Default configuration variables
const DEFAULT_SERVER_PORT = 3000;
const DEFAULT_DB_NAME = 'DroneServiceDB';

interface IConfiguration {
  server: {
    port: number;
  };
  databaseConfig: {
    dbName: string;
  };
}

export const configuration = (): IConfiguration => {
  const defaultConfiguration = {
    server: {
      port:
        parseInt(process.env.SERVER_PORT as string, 10) || DEFAULT_SERVER_PORT,
    },
    databaseConfig: {
      dbName: (process.env.DB_NAME as string) || DEFAULT_DB_NAME,
    },
  };

  return defaultConfiguration;
};

export const validateEnvironmentVars = (): void => {
  if (process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = 'development';
  }

  RequiredEnvVars.forEach((v) => {
    if (!process.env[v]) throw Error(`Missing required env variable ${v}`);
  });
};
