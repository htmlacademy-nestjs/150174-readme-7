import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentFactory } from './comment.factory';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentModel, CommentSchema } from './comment.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CommentModel.name, schema: CommentSchema },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentFactory, CommentRepository, CommentService],
  exports: [],
})
export class BlogCommentModule {}
