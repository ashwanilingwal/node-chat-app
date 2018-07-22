const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function(socket) {
  console.log('New user connected');
  socket.emit('newEmail',{
      from:'ashwanilingwal98@gmail.com',
      text:'hey',
      createAt:123
  });

socket.emit('newMessage',{
  from:'John',
  text:'See you again'
});

socket.on('createMessage',(message)=>{
  console.log('createMessage',message);
  io.emit('newMessage',{
    from:message.from,
    text:message.text,
    createdAt:new Date().getTime()
  });
});

  socket.on('disconnect', function(){
    console.log('User was disconnected');

  });
});


server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
