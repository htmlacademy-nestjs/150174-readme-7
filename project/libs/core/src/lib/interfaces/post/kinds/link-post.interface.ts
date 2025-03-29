import { BasePost } from '../base-post.interface';
import { PostKind } from '../post-kind.enum';

type LinkPost = BasePost<
  PostKind.Link,
  {
    link: string;
    description?: string;
  }
>;

export type { LinkPost };
