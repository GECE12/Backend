const io = require('socket.io-client');

let socket = io.connect('http://localhost:3030', {reconnect: true});
socket.on('connect', function() {
  console.log("El servidor se conecto como cliente");
});

module.exports = socket;