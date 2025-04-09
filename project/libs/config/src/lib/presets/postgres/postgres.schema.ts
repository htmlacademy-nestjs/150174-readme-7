import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

import {
  MIN_PORT,
  MAX_PORT,
  DEFAULT_POSTGRES_PORT,
  PostgresConfigErrorMessages,
} from './postgres.const';
import { PostgresConfig } from './postgres-config.interface';
import { ConfigSchema } from '@avylando-readme/core';

export class PostgresConfigurationSchema
  extends ConfigSchema
  implements PostgresConfig
{
  @IsString({ message: PostgresConfigErrorMessages.name })
  public name: string;

  @IsString({ message: PostgresConfigErrorMessages.host })
  public host: string;

  @IsNumber({}, { message: PostgresConfigErrorMessages.port })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  @IsOptional()
  public port: number = DEFAULT_POSTGRES_PORT;

  @IsString({ message: PostgresConfigErrorMessages.user })
  public user: string;

  @IsString({ message: PostgresConfigErrorMessages.password })
  public password: string;

  constructor() {
    super('PostgresConfigurationSchema');
  }
}
