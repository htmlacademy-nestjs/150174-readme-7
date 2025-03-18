import { MongoConfig } from '../interfaces/mongo/mongo-config.interface';

export function getMongoConnectionString({
  user,
  password,
  host,
  port,
  name,
  authBase,
}: MongoConfig): string {
  console.log(user, password, host);
  return `mongodb://${user}:${password}@${host}:${port}/${name}?authSource=${authBase}`;
}
