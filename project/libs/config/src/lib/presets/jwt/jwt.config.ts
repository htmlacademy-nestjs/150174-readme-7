import { ClassConstructor } from 'class-transformer';
import { JwtConfig } from './jwt.interface';
import { JwtConfigSchema } from './jwt.schema';
import { registerAs } from '@nestjs/config';
import {
  ConfigExtensions,
  GetConfigFromExtensions,
} from '../../config-extensions.type';
import { getConfigWithExtensions } from '../../utils/get-config-with-extensions';

function getJwtConfig<Extensions extends ConfigExtensions>(
  schema: typeof JwtConfigSchema = JwtConfigSchema,
  extensions?: Extensions
): JwtConfig & GetConfigFromExtensions<Extensions> {
  const config: JwtConfig = {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION,
  };

  return getConfigWithExtensions(config, schema, extensions);
}
function createJwtConfig(
  schema: ClassConstructor<JwtConfigSchema> = JwtConfigSchema,
  extensions?: ConfigExtensions
) {
  return (name: string) =>
    registerAs(name, () => getJwtConfig(schema, extensions));
}

export { createJwtConfig };
