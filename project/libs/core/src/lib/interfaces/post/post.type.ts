import { LinkPost } from './kinds/link-post.interface';
import { ImagePost } from './kinds/image-post.interface';
import { QuotePost } from './kinds/quote-post.interface';
import { TextPost } from './kinds/text-post.interface';
import { VideoPost } from './kinds/video-post.interface';

type Post = LinkPost | ImagePost | TextPost | VideoPost | QuotePost;

export type { Post };
