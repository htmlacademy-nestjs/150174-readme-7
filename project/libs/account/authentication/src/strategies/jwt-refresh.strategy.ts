import { accountJwtConfig } from '@project/account-config';
import { RefreshTokenPayload } from '@avylando-readme/core';

import { Inject, Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';
import { AuthenticationService } from '../module/authentication.service';
import { JwtStrategy } from './strategies.const';
import { TokenNotExistsException } from '../exceptions/token-not-exists.exception';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  JwtStrategy.refreshToken
) {
  constructor(
    @Inject(accountJwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof accountJwtConfig>,
    private readonly authService: AuthenticationService,
    private readonly refreshTokenService: RefreshTokenService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.refreshTokenSecret,
    });
  }

  public async validate(payload: RefreshTokenPayload) {
    if (!(await this.refreshTokenService.isExists(payload.tokenId))) {
      throw new TokenNotExistsException(payload.tokenId);
    }

    await this.refreshTokenService.deleteRefreshSession(payload.tokenId);
    await this.refreshTokenService.deleteExpiredRefreshTokens();

    return this.authService.findUserByEmail(payload.email);
  }
}
