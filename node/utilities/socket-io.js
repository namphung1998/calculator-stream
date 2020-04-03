const SocketIO = require('socket.io');

const { redisClient, getComputations } = require('./redis');

module.exports = server => {
  return new Promise((resolve, reject) => {
    const io = SocketIO(server);
    io.on('connection', socket => {
      resolve(socket);
    });
  })
  
}

// module.exports = server => {
//   const io = SocketIO(server);

//   io.on('connection', async socket => {
//     let client = await redisClient();

//     let computations = await getComputations();

//     socket.emit('computations', computations);

//     client.subscribe('liveComputations');
//     client.on('message', (channel, message) => {
//       if (channel === 'liveComputations') {
//         socket.emit('computation', JSON.parse(message));
//       }
//     });
//   });

// };
