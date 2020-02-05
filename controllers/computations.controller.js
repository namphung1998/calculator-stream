const ComputationService = require('../services/computation.service');

const getComputations = (req, res) => {
  ComputationService.getAll()
    .then(computations => res.send(computations))
    .catch(err => res.status(400).send({ error: 'Something went wrong' }));
}

const addComputation = (req, res) => {
  const { computation } = req.body;
  ComputationService.add(computation)
    .then(c => {
      console.log(c);
      res.send({ success: true })
    })
    .catch(err => res.status(400).send({ error: 'Something went wrong' }));
};

module.exports = {
  getComputations, addComputation
}