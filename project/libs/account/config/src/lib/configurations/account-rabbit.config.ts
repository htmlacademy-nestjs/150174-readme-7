import { createRabbitMqConfig } from '@avylando/config';
import { AccountConfigNamespace } from '../account-config.constants';

const registerConfig = createRabbitMqConfig();

export default registerConfig(AccountConfigNamespace.RABBIT);
