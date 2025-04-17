import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { AppBaseConfig, Environment } from './app-base.interface';
import { AppBaseConfigErrorMessages, ENVIRONMENTS } from './app-base.const';
import { ConfigSchema, MAX_PORT, MIN_PORT } from '@avylando-readme/core';

class AppBaseConfigSchema extends ConfigSchema implements AppBaseConfig {
  @IsNumber({}, { message: AppBaseConfigErrorMessages.port })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  @IsOptional()
  public port: number;

  @IsString({ message: AppBaseConfigErrorMessages.globalPrefix })
  public globalPrefix: string;

  @IsString({
    groups: ENVIRONMENTS,
    message: AppBaseConfigErrorMessages.environment,
  })
  @IsOptional()
  public environment: Environment;

  constructor(schemaName: string = 'AppBaseConfigSchema') {
    super(schemaName);
  }
}

export { AppBaseConfigSchema };
