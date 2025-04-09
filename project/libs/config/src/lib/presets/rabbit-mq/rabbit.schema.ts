import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

import {
  MIN_PORT,
  MAX_PORT,
  DEFAULT_RABBIT_PORT,
  RabbitConfigErrorMessages,
} from './rabbit.const';
import { RabbitMqConfig } from './rabbit-config.interface';
import { ConfigSchema } from '@avylando-readme/core';

export class RabbitMqConfigurationSchema
  extends ConfigSchema
  implements RabbitMqConfig
{
  @IsString({ message: RabbitConfigErrorMessages.queue })
  public queue: string;

  @IsString({ message: RabbitConfigErrorMessages.host })
  public host: string;

  @IsNumber({}, { message: RabbitConfigErrorMessages.port })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  @IsOptional()
  public port: number = DEFAULT_RABBIT_PORT;

  @IsString({ message: RabbitConfigErrorMessages.user })
  public user: string;

  @IsString({ message: RabbitConfigErrorMessages.password })
  public password: string;

  @IsString({ message: RabbitConfigErrorMessages.exchange })
  public exchange: string;

  constructor() {
    super('RabbitMqConfigurationSchema');
  }
}
