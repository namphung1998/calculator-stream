const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const SocketIO = require('socket.io');

const ComputationsController = require('./controllers/computations.controller');

const { redisClient } = require('./utilities/redis');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/computations', ComputationsController.getComputations);
app.post('/api/computations', ComputationsController.addComputation);
app.get('/api/ping', (req, res) => res.send('<h1>pong</h1>'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const server = http.createServer(app);
const io = SocketIO(server);
io.on('connection', socket => {
  redisClient().then(client => {
    client.subscribe('newComputation');

    client.on('message', (channel, message) => {
      if (channel === 'newComputation') {
        socket.emit('newComputation', message);
      }
    });

    socket.on('disconnect', () => {
      client.unsubscribe();
      client.quit();
    })
  });
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log('Server listening on port', port);
});
