import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import apiAppConfig from './configurations/api-app.config';
import apiRabbitConfig from './configurations/api-rabbit.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [apiAppConfig, apiRabbitConfig],
      envFilePath: 'apps/api/api.env',
      expandVariables: true,
    }),
  ],
})
export class ApiConfigModule {}
