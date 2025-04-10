import { createPostgresConfig } from '@avylando/config';
import { BlogConfigNamespace } from './blog-config.constants';

const registerConfig = createPostgresConfig();

export default registerConfig(BlogConfigNamespace.DB);
