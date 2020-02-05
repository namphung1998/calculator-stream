const { redisClient, addComputation, getComputations } = require('../utilities/redis');

const add = (computation) => {
  return redisClient().then(client => {
    client.publish('newComputation', computation);
    client.quit();
    return addComputation(computation);
  });
};

const getAll = () => {
  return getComputations();
};

module.exports = {
  add, getAll
}
