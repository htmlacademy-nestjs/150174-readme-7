import { BasePost } from './base-post.interface';

type LinkPost = BasePost & {
  kind: 'link';
  link: string;
  description?: string;
};

export type { LinkPost };
