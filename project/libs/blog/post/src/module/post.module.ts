import { Module } from '@nestjs/common';
import { PostFactory } from './post.factory';
import { PostRepository } from './post.repository';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModel, PostSchema } from './post.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PostModel.name, schema: PostSchema }]),
  ],
  controllers: [PostController],
  providers: [PostService, PostFactory, PostRepository],
})
export class BlogPostModule {}
