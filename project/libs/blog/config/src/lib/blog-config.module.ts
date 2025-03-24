import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import blogAppConfig from './blog-app.config';
import blogMongoConfig from './blog-postgres.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [blogAppConfig, blogMongoConfig],
      envFilePath: 'apps/blog/blog.env',
    }),
  ],
})
export class BlogConfigModule {}
