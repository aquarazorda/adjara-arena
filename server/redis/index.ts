import Redis from "ioredis";
import { serverEnv } from "server/env";

const redisClient = new Redis({
  keyPrefix: `${serverEnv.REDIS_PREFIX || 'AdjarabetArena'}:`,
  port: serverEnv.REDIS_PORT,
  host: serverEnv.REDIS_HOST,
  username: serverEnv.REDIS_USERNAME,
  password: serverEnv.REDIS_PASSWORD,
});

/**
 * 
 * @param cacheKey key of redis cache
 * @param minutes how many minutes to cache data
 * @param closure select from db
 * @param clean clean cache and create new
 * @returns 
 */
export const dbCache = async <T>(
  cacheKey: string,
  minutes: number,
  closure: () => Promise<T>,
  clean: boolean = false
) => {
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData && cachedData !== "{}" && !clean) {
    return JSON.parse(cachedData) as T;
  }

  const data = await closure();
  
  await redisClient.set(cacheKey, JSON.stringify(data), "EX", minutes * 100);

  return data;
}

export default redisClient;