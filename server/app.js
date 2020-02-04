const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const SocketIO = require('socket.io');

const ComputationsController = require('./controllers/computations.controller');

const { redisClient } = require('./utilities/redis');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.get('/api/computations', ComputationsController.getComputations);
app.post('/api/computations', ComputationsController.addComputation);

const server = http.createServer(app);
const io = SocketIO(server);
io.on('connection', socket => {
  redisClient().then(client => {
    client.subscribe('newComputation')

    client.on('message', (channel, message) => {
      if (channel === 'newComputation') {
        socket.emit('newComputation', message);
      }
    })
  })
})

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log('Server listening on port', port);
});
