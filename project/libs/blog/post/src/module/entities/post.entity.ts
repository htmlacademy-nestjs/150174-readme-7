import { ImagePostEntity } from './image-post.entity';
import { LinkPostEntity } from './link-post.entity';
import { QuotePostEntity } from './quote-post.entity';
import { TextPostEntity } from './text-post.entity';
import { VideoPostEntity } from './video-post.entity';

type PostEntity =
  | LinkPostEntity
  | ImagePostEntity
  | QuotePostEntity
  | TextPostEntity
  | VideoPostEntity;

export type { PostEntity };
