import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BlogCommentModule } from '@project/blog-comment';
import { BlogConfigModule, getBlogMongooseOptions } from '@project/blog-config';
import { BlogPostModule } from '@project/blog-post';

@Module({
  imports: [
    BlogPostModule,
    BlogCommentModule,
    BlogConfigModule,
    MongooseModule.forRootAsync(getBlogMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
