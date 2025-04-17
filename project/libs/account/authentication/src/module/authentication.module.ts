import { Module } from '@nestjs/common';

import { BlogUserModule } from '@project/blog-user';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/account-config';
import { JwtAccessStrategy } from '../strategies/jwt-auth.strategy';
import { AccountNotifyModule } from '@project/account-notify';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { JwtRefreshStrategy } from '../strategies/jwt-refresh.strategy';
import { LocalStrategy } from '../strategies/local.strategy';

@Module({
  imports: [
    BlogUserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    AccountNotifyModule,
    RefreshTokenModule,
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    LocalStrategy,
  ],
})
export class AuthenticationModule {}
