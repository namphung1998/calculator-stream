const SocketIO = require('socket.io');

const { redisClient } = require('./redis');

module.exports = server => {
  const io = SocketIO(server);
  io.origins('*:*') // 
  io.on('connection', async socket => {
    let client = await redisClient();

    client.subscribe('liveComputations');
    client.on('message', (channel, message) => {
      if (channel === 'liveComputations') {
        socket.emit('computation', JSON.parse(message));
      }
    });
  });
};
