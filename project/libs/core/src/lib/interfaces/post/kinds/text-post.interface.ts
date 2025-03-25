import { BasePost } from '../base-post.interface';

type TextPost = BasePost<
  'text',
  {
    title: string;
    content: string;
    preview: string;
  }
>;

export type { TextPost };
