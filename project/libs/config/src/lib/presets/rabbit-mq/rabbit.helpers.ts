import { GetConfigMap } from '@avylando-readme/core';
import { RabbitMqConfig } from './rabbit-config.interface';
import type { RabbitMQConfig as LibConfig } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '@nestjs/config';

function getRabbitMQConnectionString({
  user,
  password,
  host,
  port,
}: Pick<RabbitMqConfig, 'host' | 'port' | 'user' | 'password'>): string {
  return `amqp://${user}:${password}@${host}:${port}`;
}

export function getRabbitMQOptions<
  Namespace extends string,
  T extends RabbitMqConfig
>(
  namespace: Namespace,
  extend?: (
    config: ConfigService<GetConfigMap<Namespace, T>>
  ) => Partial<LibConfig>
) {
  return {
    useFactory: async (
      config: ConfigService<GetConfigMap<Namespace, T>>
    ): Promise<LibConfig> => {
      return {
        exchanges: [
          {
            name: config.get<string>(`${namespace}.exchange`),
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
        ...extend?.(config),
      };
    },
    inject: [ConfigService],
  };
}
