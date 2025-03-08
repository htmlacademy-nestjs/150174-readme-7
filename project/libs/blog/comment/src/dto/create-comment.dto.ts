import { Comment, WithOptionalId } from '@avylando-readme/core';

class CreateCommentDto implements WithOptionalId<Comment> {
  public postId: Comment['postId'];
  public authorId: Comment['authorId'];
  public content: Comment['content'];
}

export { CreateCommentDto };
