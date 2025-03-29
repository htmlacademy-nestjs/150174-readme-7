import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import accountAppConfig from './configurations/account-app.config';
import accountMongoConfig from './configurations/account-mongo.config';
import accountJwtConfig from './configurations/account-jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [accountAppConfig, accountMongoConfig, accountJwtConfig],
      envFilePath: 'apps/account/account.env',
    }),
  ],
})
export class AccountConfigModule {}
