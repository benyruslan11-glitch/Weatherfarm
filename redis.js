const Redis = require('ioredis');
const { config } = require('./index');

let redis;
try {
  redis = new Redis(config.redis.url, {
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      if (times > 3) return null;
      return Math.min(times * 200, 2000);
    },
    lazyConnect: true,
  });

  redis.on('error', () => {});
} catch {
  redis = null;
}

const get = async (key) => {
  if (!redis) return null;
  try { return await redis.get(key); } catch { return null; }
};

const setex = async (key, ttl, value) => {
  if (!redis) return;
  try { await redis.setex(key, ttl, value); } catch {}
};

module.exports = { redis, get, setex };
