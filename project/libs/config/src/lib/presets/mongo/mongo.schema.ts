import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { ConfigSchema, MAX_PORT, MIN_PORT } from '@avylando-readme/core';
import { DEFAULT_MONGO_PORT, MongoConfigErrorMessages } from './mongo.const';
import { MongoConfig } from './mongo-config.interface';

export class MongoConfigurationSchema
  extends ConfigSchema
  implements MongoConfig
{
  @IsString({ message: MongoConfigErrorMessages.name })
  public name: string;

  @IsString({ message: MongoConfigErrorMessages.host })
  public host: string;

  @IsNumber({}, { message: MongoConfigErrorMessages.port })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  @IsOptional()
  public port: number = DEFAULT_MONGO_PORT;

  @IsString({ message: MongoConfigErrorMessages.user })
  public user: string;

  @IsString({ message: MongoConfigErrorMessages.password })
  public password: string;

  @IsString({ message: MongoConfigErrorMessages.authBase })
  public authBase: string;

  constructor() {
    super('MongoConfigurationSchema');
  }
}
