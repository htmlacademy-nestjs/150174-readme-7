import { createMongoConfig } from '@avylando/config';
import { NotificationConfigNamespace } from '../notification-config.constants';

const registerConfig = createMongoConfig();

export default registerConfig(NotificationConfigNamespace.MONGO);
