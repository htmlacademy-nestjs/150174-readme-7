import { BasePost } from '../base-post.interface';

type ImagePost = BasePost<
  'image',
  {
    imageSrc: string;
  }
>;

export type { ImagePost };
