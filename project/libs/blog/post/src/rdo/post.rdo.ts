import { BasePost } from '@avylando-readme/core';
import { Expose } from 'class-transformer';

class PostRdo implements BasePost {
  @Expose()
  public id!: string;

  @Expose()
  public status!: BasePost['status'];

  @Expose()
  public authorId!: BasePost['authorId'];

  @Expose()
  public kind!: BasePost['kind'];

  @Expose()
  public data!: BasePost['data'];

  @Expose()
  public tags?: BasePost['tags'];

  @Expose()
  public comments?: BasePost['comments'];

  @Expose()
  public likesCount?: BasePost['likesCount'];

  @Expose()
  public createdAt?: BasePost['createdAt'];
}

export { PostRdo };
