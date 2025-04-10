import { WithOptionalId } from '../../types/with-optional-id.type';
import { User } from '../user/user.interface';

type NotificationSubscriber = Pick<
  WithOptionalId<User>,
  'id' | 'email' | 'firstName' | 'lastName'
>;

export type { NotificationSubscriber };
