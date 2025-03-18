import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { createGetMongooseOptions } from '@avylando/config';
import { AccountConfigNamespace } from './account-config.constants';

const getAccountMongooseOptions = createGetMongooseOptions(
  AccountConfigNamespace.MONGO
);

export { getAccountMongooseOptions };
