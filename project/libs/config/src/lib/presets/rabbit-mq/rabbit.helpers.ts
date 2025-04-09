import { RabbitMqConfig } from './rabbit-config.interface';

export function getRabbitMQConnectionString({
  user,
  password,
  host,
  port,
}: RabbitMqConfig): string {
  return `amqp://${user}:${password}@${host}:${port}`;
}
