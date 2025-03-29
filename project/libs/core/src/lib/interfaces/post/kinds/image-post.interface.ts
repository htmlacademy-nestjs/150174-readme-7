import { BasePost } from '../base-post.interface';
import { PostKind } from '../post-kind.enum';

type ImagePost = BasePost<
  PostKind.Image,
  {
    imageSrc: string;
  }
>;

export type { ImagePost };
