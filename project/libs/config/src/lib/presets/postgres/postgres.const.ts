import { PostgresConfig } from './postgres-config.interface';

export const MIN_PORT = 0;
export const MAX_PORT = 65535;
export const DEFAULT_POSTGRES_PORT = 5432;

const PostgresConfigErrorMessages: Record<keyof PostgresConfig, string> = {
  port: 'PostgresDB port is required',
  host: 'PostgresDB host is required',
  name: 'Database name is required',
  user: 'PostgresDB user is required',
  password: 'PostgresDB password is required',
};

export { PostgresConfigErrorMessages };
