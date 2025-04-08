import { ClassConstructor, plainToClass } from 'class-transformer';
import { JwtConfig } from './jwt.interface';
import { JwtConfigSchema } from './jwt.schema';
import { registerAs } from '@nestjs/config';

function getJwtConfig<Config extends JwtConfig>(
  extendedConfig: Config = {} as Config,
  schema: typeof JwtConfigSchema = JwtConfigSchema
): Config {
  const config: Config = {
    tokenSecret: process.env.JWT_TOKEN_SECRET,
    tokenExpiration: process.env.JWT_TOKEN_EXPIRATION,
    ...extendedConfig,
  };

  const instance = plainToClass(schema, config);

  instance.validate();

  return config;
}
function createJwtConfig<Config extends JwtConfig>(
  extendedConfig: Config = {} as Config,
  schema: ClassConstructor<JwtConfigSchema> = JwtConfigSchema
) {
  return (name: string) =>
    registerAs(name, () => getJwtConfig(extendedConfig, schema));
}

export { createJwtConfig };
