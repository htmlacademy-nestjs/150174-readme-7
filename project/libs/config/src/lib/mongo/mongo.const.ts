import { MongoConfig } from './mongo.interface';

export const MIN_PORT = 0;
export const MAX_PORT = 65535;
export const DEFAULT_MONGO_PORT = 27017;

const MongoConfigErrorMessages: Record<keyof MongoConfig, string> = {
  port: 'MongoDB port is required',
  host: 'MongoDB host is required',
  name: 'Database name is required',
  user: 'MongoDB user is required',
  password: 'MongoDB password is required',
  authBase: 'MongoDB authentication base is required',
};

export { MongoConfigErrorMessages };
