import { LinkPost } from './link-post.interface';
import { ImagePost } from './image-post.interface';
import { QuotePost } from './quote-post.interface';
import { TextPost } from './text-post.interface';
import { VideoPost } from './video-post.interface';

type Post = LinkPost | ImagePost | TextPost | VideoPost | QuotePost;

export type { Post };
