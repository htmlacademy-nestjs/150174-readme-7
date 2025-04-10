import {
  Post,
  Entity,
  StorableEntity,
  WithOptionalDbAttributes,
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
  public comments?: Post['comments'];
  public likesCount?: Post['likesCount'];

  constructor(post: WithOptionalDbAttributes<Post>) {
    super(post);
    this.populate(post);
  }

  private populate(post: WithOptionalDbAttributes<Post>): void {
    this.status = post.status;
    this.authorId = post.authorId;
    this.kind = post.kind;
    this.data = post.data;
    this.tags = post.tags;
    this.comments = post.comments;
    this.likesCount = post.likesCount;
  }

  public toPlainObject(): T {
    return {
      id: this.id,
      kind: this.kind,
      data: this.data,
      status: this.status,
      authorId: this.authorId,
      tags: this.tags,
      comments: this.comments,
      likesCount: this.likesCount,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    } as T;
  }
}

export { BlogPostEntity };
