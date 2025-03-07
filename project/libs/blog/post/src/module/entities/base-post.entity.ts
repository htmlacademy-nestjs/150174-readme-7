import { BasePost, Entity, StorableEntity } from '@avylando-readme/core';

class BasePostEntity<T extends BasePost = BasePost>
  extends Entity
  implements StorableEntity<T>
{
  public status!: BasePost['status'];
  public authorId!: BasePost['authorId'];
  public tags?: BasePost['tags'];

  constructor(post: BasePost) {
    super(post.id);
    this.populateBasePost(post);
  }

  private populateBasePost(post: BasePost) {
    this.status = post.status;
    this.authorId = post.authorId;
    this.tags = post.tags;
  }

  public toPlainObject(): T {
    throw new Error('This method should be implemented in derived classes');
  }

  public toBasePlainObject(): T {
    return {
      id: this.id,
      status: this.status,
      authorId: this.authorId,
      tags: this.tags,
    } as T;
  }
}

export { BasePostEntity };
