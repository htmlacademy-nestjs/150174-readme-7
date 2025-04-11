import { IsString } from 'class-validator';
import { JwtConfig } from './jwt.interface';
import { JwtConfigErrorMessages } from './jwt.const';
import { ConfigSchema } from '@avylando-readme/core';

class JwtConfigSchema extends ConfigSchema implements JwtConfig {
  @IsString({ message: JwtConfigErrorMessages.accessTokenSecret })
  public accessTokenSecret: string;

  @IsString({ message: JwtConfigErrorMessages.accessTokenExpiration })
  public accessTokenExpiration: string;

  @IsString({ message: JwtConfigErrorMessages.refreshTokenSecret })
  public refreshTokenSecret: string;

  @IsString({ message: JwtConfigErrorMessages.refreshTokenExpiration })
  public refreshTokenExpiration: string;

  constructor() {
    super('JwtConfigSchema');
  }
}

export { JwtConfigSchema };
