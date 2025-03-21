import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  validateOrReject,
} from 'class-validator';

import {
  MIN_PORT,
  MAX_PORT,
  DEFAULT_POSTGRES_PORT,
  PostgresConfigErrorMessages,
} from './postgres.const';
import { PostgresConfig } from './postgres-config.interface';

export class PostgresConfigurationSchema implements PostgresConfig {
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

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
