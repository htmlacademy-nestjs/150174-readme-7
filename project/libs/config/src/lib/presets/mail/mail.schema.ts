import { ConfigSchema } from '@avylando-readme/core';
import { MailConfig } from './mail.interface';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import {
  DEFAULT_SMTP_PORT,
  MailConfigErrorMessages,
  MAX_PORT,
  MIN_PORT,
} from './mail.const';

class MailConfigSchema extends ConfigSchema implements MailConfig {
  @IsString({ message: MailConfigErrorMessages.host })
  public host: string;

  @IsNumber({}, { message: MailConfigErrorMessages.port })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  @IsOptional()
  public port: number = DEFAULT_SMTP_PORT;

  @IsString({ message: MailConfigErrorMessages.user })
  public user: string;

  @IsString({ message: MailConfigErrorMessages.password })
  public password: string;

  @IsString({ message: MailConfigErrorMessages.from })
  public from: string;

  constructor() {
    super('MailConfigSchema');
  }
}

export { MailConfigSchema };
