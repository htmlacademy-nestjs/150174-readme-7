const NotificationConfigNamespace = {
  APP: 'notification-app',
  MONGO: 'notification-db',
  RABBIT: 'notification-rabbit-mq',
  MAIL: 'notification-mail',
} as const;

export { NotificationConfigNamespace };
