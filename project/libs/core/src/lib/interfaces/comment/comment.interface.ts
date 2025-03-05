import { BaseEntity } from '../base/base-entity.interface';
import { User } from '../user/user.interface';

interface Comment extends BaseEntity {
  authorId: User['id'];
  content: string;
}

export type { Comment };
