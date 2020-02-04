const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const ComputationsController = require('./controllers/computations.controller');

const SocketIO = require('./utilities/socket-io');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.get('/api/computations', ComputationsController.getComputations);
app.post('/api/computations', ComputationsController.addComputation);

const server = http.createServer(app);
const io = SocketIO(server);

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log('Server listening on port', port);
});
