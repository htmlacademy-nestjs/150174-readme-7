import { Post } from '@avylando-readme/core';
import { PostData } from 'libs/core/src/lib/interfaces/post/post.type';

const CreatePostValidationMessage: Record<
  keyof (Omit<Post, 'data' | 'id'> & PostData),
  string
> = {
  status: 'Invalid public status',
  kind: 'Invalid post kind',
  authorId: 'Invalid author id',
  repost: 'Invalid repost status',
  tags: 'Invalid tags',
  content: 'Invalid content',
  title: 'Invalid title',
  description: 'Invalid description',
  imageSrc: 'Invalid image source',
  videoSrc: 'Invalid video source',
  link: 'Invalid link',
  quote: 'Invalid quote',
  quoteAuthorId: 'Invalid quote author id',
  preview: 'Invalid preview',
};

export { CreatePostValidationMessage };
