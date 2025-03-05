import { BasePost } from './base-post.interface';

interface VideoPost extends BasePost {
  name: string;
  url: string;
}

export type { VideoPost };
