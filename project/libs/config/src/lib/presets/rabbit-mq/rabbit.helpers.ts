import { RabbitMqConfig } from './rabbit-config.interface';
import { ConfigService } from '@nestjs/config';

function getRabbitMQConnectionString({
  user,
  password,
  host,
  port,
}: Pick<RabbitMqConfig, 'host' | 'port' | 'user' | 'password'>): string {
  return `amqp://${user}:${password}@${host}:${port}`;
}

export function getRabbitMQOptions(namespace: string) {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        exchanges: [
          {
            name: config.get<string>(`${namespace}.queue`),
            type: 'direct',
          },
        ],
        uri: getRabbitMQConnectionString({
          host: config.get<string>(`${namespace}.host`),
          password: config.get<string>(`${namespace}.password`),
          user: config.get<string>(`${namespace}.user`),
          port: config.get<number>(`${namespace}.port`),
        }),
        connectionInitOptions: { wait: false },
        enableControllerDiscovery: true,
      };
    },
    inject: [ConfigService],
  };
}
