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

const DEFAULT_COMMENTS_LIMIT = 50;
const DEFAULT_COMMENTS_PAGE = 1;

export {
  BLOG_COMMENTS_CONTROLLER_NAME,
  BlogCommentsEndpoint,
  DEFAULT_COMMENTS_LIMIT,
  DEFAULT_COMMENTS_PAGE,
};
