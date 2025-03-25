import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import blogAppConfig from './blog-app.config';
import blogDbConfig from './blog-postgres.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [blogAppConfig, blogDbConfig],
      envFilePath: 'apps/blog/blog.env',
      expandVariables: true,
    }),
  ],
})
export class BlogConfigModule {}
