import { Comment } from '@avylando-readme/core';

class CreateCommentDto implements Pick<Comment, 'authorId' | 'content'> {
  public authorId: Comment['authorId'];
  public content: Comment['content'];
}

export { CreateCommentDto };
