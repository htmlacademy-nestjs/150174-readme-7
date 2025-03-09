import { Comment } from '@avylando-readme/core';

class UpdateCommentDto implements Pick<Comment, 'content'> {
  public content: Comment['content'];
}

export { UpdateCommentDto };
