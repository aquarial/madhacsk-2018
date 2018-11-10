var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var readConfig = require('read-config');
var config = readConfig('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

client.on('message', msg => {
    if (msg.content === 'dec') {
        io.emit('decrease');
    }
    if (msg.content === 'inc') {
        io.emit('increase');
    }
});
//io.on('connection', function(socket){
//  console.log('a user connected');
//  io.emit('increase');
//  socket.on('disconnect', function(){
//    console.log('user disconnected');
//    io.emit('decrease');
//  });
//});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


client.login(config.token);
