import { Tag } from '../../types/tag.type';
import { BaseEntity } from '../base/base-entity.interface';
import { User } from '../user/user.interface';
import { PostStatus } from './post-status.type';

interface BasePost extends BaseEntity {
  authorId: User['id'];
  status: PostStatus;
  tags?: Tag[];
}

export type { BasePost };
