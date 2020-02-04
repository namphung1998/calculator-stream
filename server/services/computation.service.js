const { addComputation, getComputations } = require('../utilities/redis');

const add = (computation) => {
  return addComputation(computation)
};

const getAll = () => {
  return getComputations();
};

module.exports = {
  add, getAll
}
