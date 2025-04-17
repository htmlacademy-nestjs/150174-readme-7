import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtTokenPayload } from '@avylando-readme/core';
import { AccountConfigNamespace } from '@project/account-config';
import { JwtStrategy } from './strategies.const';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  JwtStrategy.accessToken
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(
        `${AccountConfigNamespace.JWT}.accessTokenSecret`
      ) as string,
    });
  }

  public async validate(payload: JwtTokenPayload) {
    return payload;
  }
}
