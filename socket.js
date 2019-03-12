const io = require("socket.io")();

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.send('Connected to the server!');
});

const socketPort = 8000;
io.listen(socketPort);
console.log(`Socket server listening on port ${socketPort}`);