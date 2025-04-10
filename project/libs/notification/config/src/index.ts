export * from './lib/notification-config.module';

export { getNotificationMongooseOptions } from './lib/get-mongoose-options';

export { NotificationConfigNamespace } from './lib/notification-config.constants';

export { default as NotificationAppConfig } from './lib/configurations/notification-app.config';
export { default as NotificationMailConfig } from './lib/configurations/notification-mail.config';
export { default as NotificationRabbitConfig } from './lib/configurations/notification-rabbit.config';
