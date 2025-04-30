export * from './module/comment.module';

export { CommentRdo } from './rdo/comment.rdo';

export { CreateCommentDto } from './dto/create-comment.dto';
export { UpdateCommentDto } from './dto/update-comment.dto';

export { CommentQuery } from './query/comment-query.dto';

export {
  BLOG_COMMENTS_CONTROLLER_NAME,
  BlogCommentsEndpoint,
} from './module/comment.constants';
