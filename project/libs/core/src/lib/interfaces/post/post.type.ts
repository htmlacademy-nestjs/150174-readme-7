import { LinkPost } from './kinds/link-post.interface';
import { ImagePost } from './kinds/image-post.interface';
import { QuotePost } from './kinds/quote-post.interface';
import { TextPost } from './kinds/text-post.interface';
import { VideoPost } from './kinds/video-post.interface';
import { BasePost } from './base-post.interface';
import { UnionToIntersection } from '../../types/union-to-intersection.type';

type Post = Extract<
  TextPost | VideoPost | ImagePost | LinkPost | QuotePost,
  BasePost
>;

type PostData<T extends Post = Post> = UnionToIntersection<
  Pick<T, 'data'>['data']
>;

export type { Post, PostData };
