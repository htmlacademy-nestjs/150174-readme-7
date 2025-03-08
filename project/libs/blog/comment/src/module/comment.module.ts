import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentFactory } from './comment.factory';
import { CommentRepository } from './comment.repository';

@Module({
  controllers: [CommentController],
  providers: [CommentFactory, CommentRepository],
  exports: [],
})
export class BlogCommentModule {}
