import { BasePost } from './base-post.interface';

interface PhotoPost extends BasePost {
  photo: File;
}

export type { PhotoPost };
