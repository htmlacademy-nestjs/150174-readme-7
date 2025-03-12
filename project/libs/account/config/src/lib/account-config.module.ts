import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import accountAppConfig from './account-app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [accountAppConfig],
      envFilePath: 'apps/account/account.env',
    }),
  ],
})
export class AccountConfigModule {}
