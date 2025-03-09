import { BaseEntity } from '../base/base-entity.interface';
import { Post } from '../post/post.type';
import { User } from '../user/user.interface';

type Comment = BaseEntity & {
  authorId: User['id'];
  postId: Post['id'];
  content: string;
};

export type { Comment };
