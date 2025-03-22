import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentFactory } from './comment.factory';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { PrismaClientModule } from '@project/blog-models';

@Module({
  imports: [PrismaClientModule],
  controllers: [CommentController],
  providers: [CommentFactory, CommentRepository, CommentService],
  exports: [],
})
export class BlogCommentModule {}
