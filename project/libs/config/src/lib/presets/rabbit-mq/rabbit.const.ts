import { RabbitMqConfig } from './rabbit-config.interface';

export const MIN_PORT = 0;
export const MAX_PORT = 65535;
export const DEFAULT_RABBIT_PORT = 5432;

const RabbitConfigErrorMessages: Record<keyof RabbitMqConfig, string> = {
  port: 'RabbitMQ port is required',
  host: 'RabbitMQ host is required',
  queue: 'RabbitMQ queue name is required',
  user: 'RabbitMQ user is required',
  password: 'RabbitMQ password is required',
};

export { RabbitConfigErrorMessages };
