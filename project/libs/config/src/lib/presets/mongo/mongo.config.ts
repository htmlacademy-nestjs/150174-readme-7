import { registerAs } from '@nestjs/config';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { DEFAULT_MONGO_PORT } from './mongo.const';
import { MongoConfigurationSchema } from './mongo.schema';
import { MongoConfig } from './mongo-config.interface';
import { getConfigWithExtensions } from '../../utils/get-config-with-extentions';
import {
  ConfigExtensions,
  GetConfigFromExtensions,
} from '../../config-extensions.type';

function getMongoConfig<Extensions extends ConfigExtensions = ConfigExtensions>(
  schema: typeof MongoConfigurationSchema = MongoConfigurationSchema,
  extensions?: Extensions
): MongoConfig & GetConfigFromExtensions<Extensions> {
  const config: MongoConfig = plainToClass(schema, {
    host: process.env.MONGO_HOST,
    name: process.env.MONGO_DB,
    port: process.env.MONGO_PORT
      ? parseInt(process.env.MONGO_PORT, 10)
      : DEFAULT_MONGO_PORT,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    authBase: process.env.MONGO_AUTH_BASE,
  });

  return getConfigWithExtensions(config, schema, extensions);
}

function createMongoConfig(
  schema: ClassConstructor<MongoConfigurationSchema> = MongoConfigurationSchema,
  extensions?: ConfigExtensions
) {
  return (name: string) =>
    registerAs(name, () => getMongoConfig(schema, extensions));
}

export { createMongoConfig };
