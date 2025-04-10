import { BaseFactory, Comment } from '@avylando-readme/core';
import { CommentEntity } from './comment.entity';

class CommentFactory extends BaseFactory<Comment, CommentEntity> {
  constructor() {
    super(CommentEntity);
  }
}

export { CommentFactory };
