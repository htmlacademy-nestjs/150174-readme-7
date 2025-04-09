import { IsString } from 'class-validator';
import { JwtConfig } from './jwt.interface';
import { JwtConfigErrorMessages } from './jwt.const';
import { ConfigSchema } from '@avylando-readme/core';

class JwtConfigSchema extends ConfigSchema implements JwtConfig {
  @IsString({ message: JwtConfigErrorMessages.tokenSecret })
  public tokenSecret: string;

  @IsString({ message: JwtConfigErrorMessages.tokenExpiration })
  public tokenExpiration: string;

  constructor() {
    super('JwtConfigSchema');
  }
}

export { JwtConfigSchema };
