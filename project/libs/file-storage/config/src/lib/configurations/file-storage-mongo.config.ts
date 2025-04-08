import { createMongoConfig } from '@avylando/config';
import { FileStorageConfigNamespace } from '../file-storage-config.constants';

const registerConfig = createMongoConfig();

export default registerConfig(FileStorageConfigNamespace.MONGO);
