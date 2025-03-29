import { BasePost } from '../base-post.interface';
import { PostKind } from '../post-kind.enum';

type TextPost = BasePost<
  PostKind.Text,
  {
    title: string;
    content: string;
    preview: string;
  }
>;

export type { TextPost };
