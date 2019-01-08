import redis from "redis";
import { promisify } from "util";
import { hash } from 'bcrypt';
import { hacker } from 'faker';


import { getRedis } from "../helpers/redis";

const client = redis.createClient();

const getAsync = promisify(client.get).bind(client);
const getKeysAsync = promisify(client.hkeys).bind(client);

const setRedisValues = (res: string) => {
  client.set("string key", "string val", redis.print);
  client.set("key", "value!");
  client.hset(res, "hashtest 1", "some value", redis.print);
  client.hset(res, "hashtest 2", "some other value 2", redis.print);
  client.hset(res, "hashtest 3", "some other value 3", redis.print);
  client.hset(res, "hashtest 4", "some other value 4", redis.print);
  client.hset(res, "hashtest 5", "some other value 5", redis.print);
  client.hset(res, "hashtest 6", "some other value 6", redis.print);
}

export default class RunStuff {

    @getRedis('key') myKey: any;

    getKey(key: string): any {
      return getAsync('string key');
    }
}
const runningStuff = new RunStuff();
const run = async () => {
  try {
      const hashKey = await hash(hacker.phrase(), 10);
      setRedisValues(hashKey);
      const val = await runningStuff.getKey("string key");
      console.log(val);
      const newVal = await runningStuff.myKey;
      console.log('newVal: ', newVal);
      const replies = await getKeysAsync(hashKey);
      console.log(replies.length + " replies:");
      replies.forEach(function(reply, i) {
        console.log("    " + i + ": " + reply);
      });
  } catch (err) {
      console.error(err);
      process.exit(1);
  }
};
run().then(_ => client.quit());
