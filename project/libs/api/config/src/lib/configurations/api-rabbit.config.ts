import { createRabbitMqConfig } from '@avylando/config';
import { ApiConfigNamespace } from '../api-config.constants';

const registerConfig = createRabbitMqConfig();

export default registerConfig(ApiConfigNamespace.RABBIT);
