import { getMongoConnectionString } from '@avylando-readme/core';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      const uri = getMongoConnectionString({
        user: config.get<string>('account-db.user') as string,
        password: config.get<string>('account-db.password') as string,
        host: config.get<string>('account-db.host') as string,
        port: config.get<number>('account-db.port') as number,
        authBase: config.get<string>('account-db.authBase') as string,
        name: config.get<string>('account-db.name') as string,
      });

      return {
        uri,
      };
    },
    inject: [ConfigService],
  };
}
