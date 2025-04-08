import { createAppBaseConfig } from '@avylando/config';
import { BlogConfigNamespace } from './blog-config.constants';

const registerConfig = createAppBaseConfig();

export default registerConfig(BlogConfigNamespace.APP);
