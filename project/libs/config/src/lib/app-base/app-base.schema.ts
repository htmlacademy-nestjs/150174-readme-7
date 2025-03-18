import {
  IsNumber,
  IsOptional,
  IsString,
  validateOrReject,
} from 'class-validator';
import { AppBaseConfig, Environment } from './app-base.interface';
import { AppBaseConfigErrorMessages, ENVIRONMENTS } from './app-base.const';

class AppBaseConfigSchema implements AppBaseConfig {
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

  public async validate(): Promise<void> {
    return validateOrReject(this);
  }
}

export { AppBaseConfigSchema };
