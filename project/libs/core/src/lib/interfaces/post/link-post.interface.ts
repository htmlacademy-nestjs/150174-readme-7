import { BasePost } from './base-post.interface';

interface LinkPost extends BasePost {
  link: string;
  description?: string;
}

export type { LinkPost };
