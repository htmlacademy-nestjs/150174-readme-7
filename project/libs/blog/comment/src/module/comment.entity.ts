import { Comment, Entity, StorableEntity } from '@avylando-readme/core';

class CommentEntity extends Entity implements StorableEntity<Comment> {
  public postId!: Comment['postId'];
  public authorId!: Comment['authorId'];
  public content!: Comment['content'];

  constructor(comment: Comment) {
    super(comment);
    this.populate(comment);
  }

  private populate(comment: Comment): void {
    this.postId = comment.postId;
    this.authorId = comment.authorId;
    this.content = comment.content;
    this.createdAt = comment.createdAt;
  }

  public toPlainObject(): Comment {
    return {
      id: this.id,
      postId: this.postId,
      authorId: this.authorId,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export { CommentEntity };
