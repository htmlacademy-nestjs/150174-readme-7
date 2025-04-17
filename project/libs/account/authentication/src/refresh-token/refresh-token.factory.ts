import { BaseFactory, JwtToken } from '@avylando-readme/core';
import { RefreshTokenEntity } from './refresh-token.entity';
import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

@Injectable()
class RefreshTokenFactory extends BaseFactory<JwtToken, RefreshTokenEntity> {
  constructor() {
    super(RefreshTokenEntity);
  }
}
export { RefreshTokenFactory };
