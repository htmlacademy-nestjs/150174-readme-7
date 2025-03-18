import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AccountConfigModule,
  getMongooseOptions,
} from '@project/account-config';

import { AuthenticationModule } from '@project/authentication';
import { BlogUserModule } from '@project/blog-user';

@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule,
    AccountConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
