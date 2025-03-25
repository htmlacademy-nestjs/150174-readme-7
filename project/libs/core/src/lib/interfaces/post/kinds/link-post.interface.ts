import { BasePost } from '../base-post.interface';

type LinkPost = BasePost<
  'link',
  {
    link: string;
    description?: string;
  }
>;

export type { LinkPost };
