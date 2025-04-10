import { createGetMongooseOptions } from '@avylando/config';
import { NotificationConfigNamespace } from './notification-config.constants';

const getNotificationMongooseOptions = createGetMongooseOptions(
  NotificationConfigNamespace.MONGO
);

export { getNotificationMongooseOptions };
