import {
  Comment,
  Entity,
  StorableEntity,
  WithOptionalId,
} from '@avylando-readme/core';

class CommentEntity extends Entity implements StorableEntity<Comment> {
  public postId!: Comment['postId'];
  public authorId!: Comment['authorId'];
  public content!: Comment['content'];

  constructor(comment: WithOptionalId<Comment>) {
    super(comment.id);
    this.populate(comment);
  }

  private populate(comment: WithOptionalId<Comment>): void {
    this.postId = comment.postId;
    this.authorId = comment.authorId;
    this.content = comment.content;
  }

  public toPlainObject(): Comment {
    return {
      id: this.id,
      postId: this.postId,
      authorId: this.authorId,
      content: this.content,
    };
  }
}

export { CommentEntity };
