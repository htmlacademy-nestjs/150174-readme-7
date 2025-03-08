import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentFactory } from './comment.factory';
import { CommentEntity } from './comment.entity';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@Injectable()
class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly commentFactory: CommentFactory
  ) {}

  async createComment(
    postId: string,
    dto: CreateCommentDto
  ): Promise<CommentEntity> {
    const comment = this.commentFactory.create({ ...dto, postId });
    return this.commentRepository.save(comment);
  }

  async getCommentsByPostId(postId: string): Promise<CommentEntity[]> {
    return this.commentRepository.getCommentsByPostId(postId);
  }

  async findComment(commentId: string): Promise<CommentEntity> {
    const comment = await this.commentRepository.findById(commentId);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  async updateComment(
    id: string,
    dto: UpdateCommentDto
  ): Promise<CommentEntity> {
    const existingComment = await this.findComment(id);

    const comment = this.commentFactory.create({
      ...existingComment,
      ...dto,
      id: existingComment.id,
    });
    return this.commentRepository.update(comment);
  }

  async deleteComment(commentId: string): Promise<void> {
    return this.commentRepository.deleteById(commentId);
  }
}

export { CommentService };
