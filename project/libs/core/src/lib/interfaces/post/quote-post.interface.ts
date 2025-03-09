import { User } from '../user/user.interface';
import { BasePost } from './base-post.interface';

type QuotePost = BasePost & {
  kind: 'quote';
  quoteAuthorId: User['id'];
  content: string;
};

export type { QuotePost };
