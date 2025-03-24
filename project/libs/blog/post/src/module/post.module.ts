import { Module } from '@nestjs/common';
import { PostFactory } from './post.factory';
import { PostRepository } from './post.repository';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PostFactory, PostRepository],
})
export class BlogPostModule {}
