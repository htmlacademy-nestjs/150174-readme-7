import { Module } from '@nestjs/common';

import { BlogCommentModule } from '@project/blog-comment';
import { BlogPostModule } from '@project/blog-post';

@Module({
  imports: [BlogPostModule, BlogCommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
