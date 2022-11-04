var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const users = {};
io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('login', function(data){
    console.log('a user ' + data.userId + ' connected');
    // saving userId to object with socket ID
    users[socket.id] = data.userId;
  });

  socket.on('disconnect', function(){
    console.log('user ' + users[socket.id] + ' disconnected');
    // remove saved socket from users object
    delete users[socket.id];
  });

});

setInterval(function(){
    io.emit('allUsers', users);
    console.log(users);
}, 1000);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(process.env.PORT|| 3401, function(){
    console.log('listening on *:3401');
});


