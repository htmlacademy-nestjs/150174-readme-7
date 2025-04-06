import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { createGetMongooseOptions } from '@avylando/config';
import { FileStorageConfigNamespace } from './file-storage-config.constants';

const getFileStorageMongooseOptions = createGetMongooseOptions(
  FileStorageConfigNamespace.MONGO
);

export { getFileStorageMongooseOptions };
