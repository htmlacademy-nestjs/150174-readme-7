import {
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  validateOrReject,
} from 'class-validator';
import { AppBaseConfig, Environment } from './app-base.interface';
import { AppBaseConfigErrorMessages, ENVIRONMENTS } from './app-base.const';

class AppBaseConfigSchema implements AppBaseConfig {
  @IsNumber({}, { message: AppBaseConfigErrorMessages.port })
  @IsOptional()
  public port: number;

  @IsUrl(
    { require_protocol: false, require_host: false, require_port: false },
    { message: AppBaseConfigErrorMessages.basePath }
  )
  public basePath: string;

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
