import { createRabbitMqConfig } from '@avylando/config';
import { FileStorageConfigNamespace } from '../file-storage-config.constants';

const registerConfig = createRabbitMqConfig();

export default registerConfig(FileStorageConfigNamespace.RABBIT);
