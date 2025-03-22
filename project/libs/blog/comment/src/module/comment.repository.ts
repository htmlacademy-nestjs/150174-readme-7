import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '@project/blog-models';
import { PostgresRepository } from '@avylando-readme/core';

import { CommentEntity } from './comment.entity';
import { CommentFactory } from './comment.factory';

@Injectable()
class CommentRepository extends PostgresRepository<CommentEntity> {
  constructor(entityFactory: CommentFactory, client: PrismaClientService) {
    super(entityFactory, client);
  }

  async getCommentsByPostId(postId: string): Promise<CommentEntity[]> {
    const comments = await this.client.comment.findMany({
      where: {
        postId,
      },
    });
    return comments.map((comment) => this.createEntityFromDocument(comment));
  }
}

export { CommentRepository };
