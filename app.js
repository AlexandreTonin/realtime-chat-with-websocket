// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('Novo usuário conectado');

  // Evento para lidar com mensagens do cliente
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Envia a mensagem para todos os clientes conectados
  });

  // Evento para lidar com desconexão do cliente
  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});
