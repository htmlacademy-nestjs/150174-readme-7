import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { getMailerAsyncOptions } from '@avylando/config';
import { NotificationConfigNamespace } from '@project/notification-config';
import { NotificationMailerService } from './mailer.service';

@Module({
  imports: [
    MailerModule.forRootAsync(
      getMailerAsyncOptions(NotificationConfigNamespace.MAIL)
    ),
  ],
  providers: [NotificationMailerService],
  exports: [NotificationMailerService],
})
export class NotificationMailerModule {}
