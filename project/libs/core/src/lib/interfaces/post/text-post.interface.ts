import { BasePost } from './base-post.interface';

interface TextPost extends BasePost {
  name: string;
  content: string;
  preview: string;
}

export type { TextPost };
