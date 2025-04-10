import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import accountAppConfig from './configurations/account-app.config';
import accountMongoConfig from './configurations/account-mongo.config';
import accountJwtConfig from './configurations/account-jwt.config';
import accountRabbitConfig from './configurations/account-rabbit.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        accountAppConfig,
        accountMongoConfig,
        accountJwtConfig,
        accountRabbitConfig,
      ],
      envFilePath: 'apps/account/account.env',
    }),
  ],
})
export class AccountConfigModule {}
