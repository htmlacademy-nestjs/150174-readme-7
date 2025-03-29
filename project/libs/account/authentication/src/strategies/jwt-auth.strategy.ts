import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtTokenPayload } from '@avylando-readme/core';
import { AccountConfigNamespace } from '@project/account-config';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(
        `${AccountConfigNamespace.JWT}.tokenSecret`
      ) as string,
    });
  }

  public async validate(payload: JwtTokenPayload) {
    return payload;
  }
}
