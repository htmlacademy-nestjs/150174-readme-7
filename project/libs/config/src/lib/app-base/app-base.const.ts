import { AppBaseConfig, Environment } from './app-base.interface';

const DEFAULT_PORT = 4000;

const AppEnvironment: Record<string, Environment> = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  STAGE: 'stage',
  TEST: 'test',
};

const ENVIRONMENTS = Object.values(AppEnvironment);

const AppBaseConfigErrorMessages: Record<keyof AppBaseConfig, string> = {
  port: 'Port must be a number',
  basePath: 'Base path must be a valid URL',
  environment: `Environment must be one of: ${ENVIRONMENTS.join(', ')}`,
};

export {
  DEFAULT_PORT,
  AppEnvironment,
  ENVIRONMENTS,
  AppBaseConfigErrorMessages,
};
