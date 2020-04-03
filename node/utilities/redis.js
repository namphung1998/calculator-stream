const redis = require('redis');
const { promisifyAll } = require('bluebird');

promisifyAll(redis.RedisClient.prototype);

const redisClient = () => {
  return new Promise((resolve, reject) => {
    let client = redis.createClient(process.env.REDIS_URL);

    client.on('error', err => {
      reject(err.message);
    });

    client.on('connect', () => {
      resolve(client);
    });
  });
}

const getComputations = async () => {
  const client = await redisClient();

  const result = await client.lrangeAsync('computations', -10, -1);
  client.quit();
  return result;

}

const addComputation = async comp => {
  const client = await redisClient();

  const result = await client.rpushAsync('computations', comp);
  client.quit();
  return result;
}

module.exports = {
  redisClient,
  getComputations,
  addComputation
};