import { BLOG_POSTS_CONTROLLER_NAME } from '@project/blog-post';
import { join } from 'node:path';

const BLOG_COMMENTS_CONTROLLER_NAME = join(
  BLOG_POSTS_CONTROLLER_NAME,
  ':postId',
  'comments'
);

const BlogCommentsEndpoint = {
  COMMENTS: '/',
  COMMENT: ':id',
} as const;

export { BLOG_COMMENTS_CONTROLLER_NAME, BlogCommentsEndpoint };
