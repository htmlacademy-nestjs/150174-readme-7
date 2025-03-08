import { Comment, EntityFactory, WithOptionalId } from '@avylando-readme/core';
import { CommentEntity } from './comment.entity';

class CommentFactory implements EntityFactory<CommentEntity> {
  public create(comment: WithOptionalId<Comment>): CommentEntity {
    return new CommentEntity(comment);
  }
}

export { CommentFactory };
