import { User } from '../user/user.interface';

type NotificationSubscriber = Pick<
  User,
  'id' | 'email' | 'firstName' | 'lastName'
>;

export type { NotificationSubscriber };
