import { Tag } from './tag.type';
import { BaseEntity } from '../base/base-entity.interface';
import { User } from '../user/user.interface';
import { PostStatus } from './post-status.type';

type BasePost = BaseEntity & {
  authorId: User['id'];
  status: PostStatus;
  tags?: Tag[];
};

export type { BasePost };
