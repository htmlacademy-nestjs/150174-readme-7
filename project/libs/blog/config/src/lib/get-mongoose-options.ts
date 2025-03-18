import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { createGetMongooseOptions } from '@avylando/config';
import { BlogConfigNamespace } from './blog-config.constants';

const getBlogMongooseOptions = createGetMongooseOptions(
  BlogConfigNamespace.MONGO
);

export { getBlogMongooseOptions };
