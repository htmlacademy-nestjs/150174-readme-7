import { BasePost } from './base-post.interface';

interface ImagePost extends BasePost {
  imageSrc: string;
}

export type { ImagePost };
