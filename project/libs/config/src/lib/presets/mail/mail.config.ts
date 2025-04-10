import { ClassConstructor } from 'class-transformer';
import { MailConfig } from './mail.interface';
import { MailConfigSchema } from './mail.schema';
import { registerAs } from '@nestjs/config';
import {
  ConfigExtensions,
  GetConfigFromExtensions,
} from '../../config-extensions.type';
import { getConfigWithExtensions } from '../../utils/get-config-with-extensions';
import { DEFAULT_SMTP_PORT } from './mail.const';

function getMailConfig<Extensions extends ConfigExtensions>(
  schema: typeof MailConfigSchema = MailConfigSchema,
  extensions?: Extensions
): MailConfig & GetConfigFromExtensions<Extensions> {
  const config: MailConfig = {
    host: process.env.MAIL_SMTP_HOST,
    port: process.env.MAIL_SMTP_PORT
      ? parseInt(process.env.MAIL_SMTP_PORT, 10)
      : DEFAULT_SMTP_PORT,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    from: process.env.MAIL_FROM,
  };


  return getConfigWithExtensions(config, schema, extensions);
}
function createMailConfig(
  schema: ClassConstructor<MailConfigSchema> = MailConfigSchema,
  extensions?: ConfigExtensions
) {
  return (name: string) =>
    registerAs(name, () => getMailConfig(schema, extensions));
}

export { createMailConfig };
