import { createRabbitMqConfig } from '@avylando/config';
import { NotificationConfigNamespace } from '../notification-config.constants';

const registerConfig = createRabbitMqConfig();

export default registerConfig(NotificationConfigNamespace.RABBIT);
