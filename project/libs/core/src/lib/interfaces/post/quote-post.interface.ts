import { User } from '../user/user.interface';
import { BasePost } from './base-post.interface';

interface QuotePost extends BasePost {
  author: User['id'];
  content: string;
}

export type { QuotePost };
