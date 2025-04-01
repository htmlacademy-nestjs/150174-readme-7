import { Post, PostData, BaseEntity } from '@avylando-readme/core';

const CreatePostValidationMessage: Record<
  keyof (Omit<Post, 'data' | 'comments' | 'likesCount' | keyof BaseEntity> &
    PostData),
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
