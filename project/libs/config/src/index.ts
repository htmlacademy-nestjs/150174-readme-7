export { createAppBaseConfig } from './lib/app-base/app-base.config';

export { createMongoConfig } from './lib/mongo/mongo.config';

export {
  getMongoConnectionString,
  createGetMongooseOptions,
} from './lib/mongo/mongo.helpers';

export { createPostgresConfig } from './lib/postgres/postgres.config';
export { getPostgresConnectionString } from './lib/postgres/postgres.helpers';

export { createJwtConfig } from './lib/jwt/jwt.config';

export type { AppBaseConfig } from './lib/app-base/app-base.interface';
export { AppBaseConfigSchema } from './lib/app-base/app-base.schema';

export type { MongoConfig } from './lib/mongo/mongo-config.interface';
export { MongoConfigurationSchema } from './lib/mongo/mongo.schema';

export type { PostgresConfig } from './lib/postgres/postgres-config.interface';
export { PostgresConfigurationSchema } from './lib/postgres/postgres.schema';

export type { JwtConfig } from './lib/jwt/jwt.interface';
export { JwtConfigSchema } from './lib/jwt/jwt.schema';
