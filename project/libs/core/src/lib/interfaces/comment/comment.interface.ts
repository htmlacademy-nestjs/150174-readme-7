import { WithOptionalDbAttributes } from '../../types/with-optional-db-attributes.type';
import { Post } from '../post/post.type';
import { User } from '../user/user.interface';

type Comment = WithOptionalDbAttributes<{
  authorId: User['id'];
  postId: Post['id'];
  content: string;
}>;

export type { Comment };
