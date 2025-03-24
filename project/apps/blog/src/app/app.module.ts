import { Module } from '@nestjs/common';

import { BlogCommentModule } from '@project/blog-comment';
import { BlogConfigModule } from '@project/blog-config';
import { BlogPostModule } from '@project/blog-post';

@Module({
  imports: [BlogPostModule, BlogCommentModule, BlogConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
