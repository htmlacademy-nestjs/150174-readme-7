import { RabbitMqConfig } from './rabbit-config.interface';

export const DEFAULT_RABBIT_PORT = 5432;

const RabbitConfigErrorMessages: Record<keyof RabbitMqConfig, string> = {
  port: 'RabbitMQ port is required',
  host: 'RabbitMQ host is required',
  queue: 'RabbitMQ queue name is required',
  user: 'RabbitMQ user is required',
  password: 'RabbitMQ password is required',
  exchange: 'RabbitMQ exchange is required',
};

export { RabbitConfigErrorMessages };
