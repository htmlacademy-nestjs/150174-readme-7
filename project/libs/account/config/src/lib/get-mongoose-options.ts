import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { createGetMongooseOptions } from '@avylando/config';
import { AccountConfigNamespace } from './account-config.constants';

const getMongooseOptions = createGetMongooseOptions(
  AccountConfigNamespace.MONGO
);

export { getMongooseOptions };
