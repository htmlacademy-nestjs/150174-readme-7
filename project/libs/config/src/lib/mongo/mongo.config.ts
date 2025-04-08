import { registerAs } from '@nestjs/config';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { DEFAULT_MONGO_PORT } from './mongo.const';
import { MongoConfigurationSchema } from './mongo.schema';
import { MongoConfig } from './mongo-config.interface';

function getMongoConfig<Config extends MongoConfig>(
  extendedConfig: Config = {} as Config,
  schema: typeof MongoConfigurationSchema = MongoConfigurationSchema
): Config {
  const config = plainToClass(schema, {
    host: process.env.MONGO_HOST,
    name: process.env.MONGO_DB,
    port: process.env.MONGO_PORT
      ? parseInt(process.env.MONGO_PORT, 10)
      : DEFAULT_MONGO_PORT,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    authBase: process.env.MONGO_AUTH_BASE,
    ...extendedConfig,
  }) as unknown as Config;
  const instance = plainToClass(schema, config);

  instance.validate();

  return config;
}

function createMongoConfig<Config extends MongoConfig>(
  extendedConfig: Config = {} as Config,
  schema: ClassConstructor<MongoConfigurationSchema> = MongoConfigurationSchema
) {
  return (name: string) =>
    registerAs(name, () => getMongoConfig(extendedConfig, schema));
}

export { createMongoConfig };
