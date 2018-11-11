var express = require('express');
var app = express();
app.use(express.static(__dirname));

var http = require('http').Server(app);
var io = require('socket.io')(http);
var readConfig = require('read-config');
var config = readConfig('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client();
client.on('message', msg => {
    if (msg.guild !== null && msg.guild.available && msg.guild.id === "453207241294610442") {
        var a = { authorid: msg.author.id, chanid: msg.channel.id, channame: msg.channel.name };
        io.emit("msg", a);
    }
});
client.on("ready", () => {
  app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

  io.on('connection', function(socket){
    //console.log('a user connected');
    //io.emit('increase');
      socket.emit("channels", [...client.guilds.get(config.guild).channels].map(a => a[1]));
    socket.on('disconnect', function(){
      //console.log('user disconnected');
      //io.emit('decrease');
    });
  });

  http.listen(3000, function(){
    console.log('listening on *:3000');
  });


});

client.login(config.token);
