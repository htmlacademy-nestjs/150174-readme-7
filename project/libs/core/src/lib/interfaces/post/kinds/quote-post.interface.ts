import { User } from '../../user/user.interface';
import { BasePost } from '../base-post.interface';
import { PostKind } from '../post-kind.enum';

type QuotePost = BasePost<
  PostKind.Quote,
  {
    authorName: string;
    quote: string;
  }
>;

export type { QuotePost };
