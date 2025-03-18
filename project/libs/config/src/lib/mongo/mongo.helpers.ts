import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { MongoConfig } from './mongo-config.interface';

export function getMongoConnectionString({
  user,
  password,
  host,
  port,
  name,
  authBase,
}: MongoConfig): string {
  return `mongodb://${user}:${password}@${host}:${port}/${name}?authSource=${authBase}`;
}

export function createGetMongooseOptions(namespace: string) {
  return (): MongooseModuleAsyncOptions => ({
    useFactory: async (config: ConfigService) => {
      const uri = getMongoConnectionString({
        user: config.get<string>(`${namespace}.user`) as string,
        password: config.get<string>(`${namespace}.password`) as string,
        host: config.get<string>(`${namespace}.host`) as string,
        port: config.get<number>(`${namespace}.port`) as number,
        authBase: config.get<string>(`${namespace}.authBase`) as string,
        name: config.get<string>(`${namespace}.name`) as string,
      });

      return {
        uri,
      };
    },
    inject: [ConfigService],
  });
}
