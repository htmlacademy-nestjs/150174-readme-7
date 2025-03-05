import { BasePost } from './base-post.interface';

interface PhotoPost extends BasePost {
  photoSrc: string;
}

export type { PhotoPost };
