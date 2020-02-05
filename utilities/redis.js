const redis = require('redis');
const { promisifyAll } = require('bluebird');

promisifyAll(redis.RedisClient.prototype);

const redisClient = () => {
  return new Promise((resolve, reject) => {
    let client = redis.createClient(process.env.REDIS_URI);

    client.on('error', err => {
      reject(err.message);
    });

    client.on('connect', () => {
      resolve(client);
    });
  });
}

const getComputations = () => {
  return redisClient()
    .then(client => {
      return client.lrangeAsync('computations', -10, -1)
    })
}

const addComputation = comp => {
  return redisClient()
    .then(client => client.rpushAsync('computations', comp))
}

module.exports = {
  redisClient,
  getComputations,
  addComputation
};