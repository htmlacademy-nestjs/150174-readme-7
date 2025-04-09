import { IsNumber, IsOptional, IsString } from 'class-validator';
import { AppBaseConfig, Environment } from './app-base.interface';
import { AppBaseConfigErrorMessages, ENVIRONMENTS } from './app-base.const';
import { ConfigSchema } from '@avylando-readme/core';

class AppBaseConfigSchema extends ConfigSchema implements AppBaseConfig {
  @IsNumber({}, { message: AppBaseConfigErrorMessages.port })
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

  constructor() {
    super('AppBaseConfigSchema');
  }
}

export { AppBaseConfigSchema };
