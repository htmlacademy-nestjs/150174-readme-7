import { PostSortBy, SortDirection } from '@avylando-readme/core';

const DEFAULT_POSTS_LIMIT = 25;
const DEFAULT_POSTS_SEARCH_LIMIT = 20;

const DEFAULT_POSTS_PAGE = 1;
const DEFAULT_POSTS_SORT_DIRECTION = SortDirection.DESC;
const DEFAULT_POSTS_SORT_BY = PostSortBy.CreatedAt;

const BLOG_POSTS_CONTROLLER_NAME = 'posts';

const BlogPostsEndpoint = {
  POSTS: '/',
  POST: ':id',
  LIKE_POST: ':id/like',
  COMMENTS: ':id/comments',
  SEARCH: '/search',
  DRAFTS: '/drafts',
  FEED: '/feed',
  SUBSCRIBE: '/subscribe/:authorId',
} as const;

export {
  DEFAULT_POSTS_LIMIT,
  DEFAULT_POSTS_SEARCH_LIMIT,
  DEFAULT_POSTS_PAGE,
  DEFAULT_POSTS_SORT_DIRECTION,
  DEFAULT_POSTS_SORT_BY,
  BLOG_POSTS_CONTROLLER_NAME,
  BlogPostsEndpoint,
};
