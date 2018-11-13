const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.use(express.static('.'));

io.on('connection', (socket) => {
  console.log('A User connected');
  socket.broadcast.emit('hi');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('pin', (data) => {
    console.log(data);
    socket.emit('pon', "Yay! You're on Websocket!");
  });

  socket.on('pushPosition', (data) => {
    console.log(`Data Get:${data}`);
  })
});

http.listen(3000, () => {
	console.log('listening on *:3000');
});
