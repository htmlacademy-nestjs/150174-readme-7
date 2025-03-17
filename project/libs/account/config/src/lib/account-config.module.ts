import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import accountAppConfig from './account-app.config';
import accountMongoConfig from './account-mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [accountAppConfig, accountMongoConfig],
      envFilePath: 'apps/account/account.env',
    }),
  ],
})
export class AccountConfigModule {}
