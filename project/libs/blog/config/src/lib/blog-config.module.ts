import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import blogAppConfig from './blog-app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [blogAppConfig],
      envFilePath: 'apps/blog/blog.env',
    }),
  ],
})
export class BlogConfigModule {}
