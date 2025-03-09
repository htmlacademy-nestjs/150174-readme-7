import { BasePost } from './base-post.interface';

type VideoPost = BasePost & {
  kind: 'video';
  name: string;
  videoSrc: string;
};

export type { VideoPost };
