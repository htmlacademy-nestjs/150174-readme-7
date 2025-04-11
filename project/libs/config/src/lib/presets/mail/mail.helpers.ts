import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';

import { resolve } from 'node:path';

export function getMailerAsyncOptions(namespace: string): MailerAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => {
      return {
        transport: {
          host: configService.get<string>(`${namespace}.host`),
          port: configService.get<number>(`${namespace}.port`),
          secure: false,
          auth: {
            user: configService.get<string>(`${namespace}.user`),
            pass: configService.get<string>(`${namespace}.password`),
          },
        },
        defaults: {
          from: configService.get<string>(`${namespace}.from`),
        },
        template: {
          dir: resolve(__dirname, 'assets', 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      };
    },
    inject: [ConfigService],
  };
}
