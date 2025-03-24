import { PostgresConfig } from './postgres-config.interface';

export function getPostgresConnectionString({
  user,
  password,
  host,
  port,
  name,
}: PostgresConfig): string {
  return `postgres://${user}:${password}@${host}:${port}/${name}`;
}
