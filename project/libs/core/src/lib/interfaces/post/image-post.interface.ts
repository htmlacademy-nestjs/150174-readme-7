import { BasePost } from './base-post.interface';

type ImagePost = BasePost & {
  kind: 'image';
  imageSrc: string;
};

export type { ImagePost };
