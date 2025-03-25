import {
  Post,
  Entity,
  StorableEntity,
  WithOptionalId,
} from '@avylando-readme/core';

class BlogPostEntity<T extends Post = Post>
  extends Entity
  implements StorableEntity<T>
{
  public status!: Post['status'];
  public authorId!: Post['authorId'];
  public kind!: Post['kind'];
  public data!: Post['data'];
  public tags?: Post['tags'];

  constructor(post: WithOptionalId<Post>) {
    super(post.id);
    this.populate(post);
  }

  private populate(post: WithOptionalId<Post>): void {
    this.status = post.status;
    this.authorId = post.authorId;
    this.kind = post.kind;
    this.data = post.data;
    this.tags = post.tags;
  }

  public toPlainObject(): T {
    return {
      id: this.id,
      kind: this.kind,
      data: this.data,
      status: this.status,
      authorId: this.authorId,
      tags: this.tags,
    } as T;
  }
}

export { BlogPostEntity };
