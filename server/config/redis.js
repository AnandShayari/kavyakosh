import Redis from 'ioredis';

let redisClient;

export const getRedisClient = () => {
  if (!process.env.REDIS_URL) {
    return null;
  }

  if (!redisClient) {
    redisClient = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 2,
      enableReadyCheck: false,
    });

    redisClient.on('error', (error) => {
      console.warn(`Redis connection error: ${error.message}`);
    });
  }

  return redisClient;
};

export default getRedisClient;
