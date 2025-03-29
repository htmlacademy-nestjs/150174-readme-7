import { Comment } from '@avylando-readme/core';
import { Expose } from 'class-transformer';

class CommentRdo implements Comment {
  @Expose()
  public id!: string;

  @Expose()
  public postId!: string;

  @Expose()
  public authorId!: string;

  @Expose()
  public content!: string;

  @Expose()
  public createdAt!: Date;
}

export { CommentRdo };
