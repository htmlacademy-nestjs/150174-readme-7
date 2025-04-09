import { AppBaseConfigSchema, createAppBaseConfig } from '@avylando/config';
import { NotificationConfigNamespace } from '../notification-config.constants';

class NotificationAppConfigSchema extends AppBaseConfigSchema {}

const registerConfig = createAppBaseConfig(NotificationAppConfigSchema);

export default registerConfig(NotificationConfigNamespace.APP);
