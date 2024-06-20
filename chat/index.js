const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:4200', // Especifica el origen permitido
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('sendMessage', (messageInfo) => {
    console.log("Enviando un mensaje ");
    socket.broadcast.emit("recieveMessage", messageInfo)
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
