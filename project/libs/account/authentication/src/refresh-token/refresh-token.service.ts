import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import dayjs from 'dayjs';

import { accountJwtConfig } from '@project/account-config';
import { RefreshTokenPayload, parseTime } from '@avylando-readme/core';

import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshTokenFactory } from './refresh-token.factory';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenFactory: RefreshTokenFactory,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    @Inject(accountJwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof accountJwtConfig>
  ) {}

  public async createRefreshSession(payload: RefreshTokenPayload) {
    const timeValue = parseTime(this.jwtOptions.refreshTokenExpiration);
    const refreshToken = this.refreshTokenFactory.create({
      tokenId: payload.tokenId,
      userId: payload.sub,
      expiresIn: dayjs().add(timeValue.value, timeValue.unit).toDate(),
    });
    return this.refreshTokenRepository.save(refreshToken);
  }

  public async deleteRefreshSession(tokenId: string): Promise<void> {
    await this.deleteExpiredRefreshTokens();
    await this.refreshTokenRepository.deleteByTokenId(tokenId);
  }

  public async isExists(tokenId: string): Promise<boolean> {
    const refreshToken = await this.refreshTokenRepository.findByTokenId(
      tokenId
    );
    return refreshToken !== null;
  }

  public async deleteExpiredRefreshTokens() {
    await this.refreshTokenRepository.deleteExpiredTokens();
  }
}
