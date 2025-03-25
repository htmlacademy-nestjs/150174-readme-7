import { BasePost } from '../base-post.interface';

type VideoPost = BasePost<
  'video',
  {
    title: string;
    videoSrc: string;
  }
>;

export type { VideoPost };
