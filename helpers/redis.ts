import redis from "redis";
import { promisify } from "util";

const client = redis.createClient();

const getAsync = promisify(client.get).bind(client);

export const getRedis = (value: string) =>
  (target: any, propertyKey: string): any =>
    target[propertyKey] = getAsync(value);
