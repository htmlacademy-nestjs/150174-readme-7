import { MailConfig } from './mail.interface';

export const DEFAULT_SMTP_PORT = 8025;

const MailConfigErrorMessages: Record<keyof MailConfig, string> = {
  host: 'Mail host is required',
  port: 'Mail port is required',
  user: 'Mail user is required',
  password: 'Mail password is required',
  from: 'Mail from address is required',
};

export { MailConfigErrorMessages };
