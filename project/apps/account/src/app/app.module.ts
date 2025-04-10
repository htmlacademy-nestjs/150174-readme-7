import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AccountConfigModule,
  getAccountMongooseOptions,
} from '@project/account-config';

import { AuthenticationModule } from '@project/authentication';
import { BlogUserModule } from '@project/blog-user';
import { AccountNotifyModule } from '@project/account-notify';
@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule,
    AccountNotifyModule,
    AccountConfigModule,
    MongooseModule.forRootAsync(getAccountMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
