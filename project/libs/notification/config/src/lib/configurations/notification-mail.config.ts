import { createMailConfig } from '@avylando/config';
import { NotificationConfigNamespace } from '../notification-config.constants';

const registerConfig = createMailConfig();

export default registerConfig(NotificationConfigNamespace.MAIL);
