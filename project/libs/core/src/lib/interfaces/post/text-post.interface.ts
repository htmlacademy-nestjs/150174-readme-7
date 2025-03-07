import { BasePost } from './base-post.interface';

type TextPost = BasePost & {
  kind: 'text';
  name: string;
  content: string;
  preview: string;
};

export type { TextPost };
