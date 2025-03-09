import { Injectable } from '@nestjs/common';

import { MemoryRepository } from '@avylando-readme/core';
import { CommentEntity } from './comment.entity';
import { CommentFactory } from './comment.factory';

@Injectable()
class CommentRepository extends MemoryRepository<CommentEntity> {
  constructor(entityFactory: CommentFactory) {
    super(entityFactory);
  }

  getCommentsByPostId(postId: string): CommentEntity[] {
    return this.entitiesArray
      .filter((comment) => comment.postId === postId)
      .map(this.entityFactory.create);
  }
}

export { CommentRepository };
