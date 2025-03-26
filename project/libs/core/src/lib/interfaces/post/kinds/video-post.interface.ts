import { BasePost } from '../base-post.interface';
import { PostKind } from '../post-kind.enum';

type VideoPost = BasePost<
  PostKind.Video,
  {
    title: string;
    videoSrc: string;
  }
>;

export type { VideoPost };
