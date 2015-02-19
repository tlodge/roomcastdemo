var http = require('http');
var express = require('express');
var RED = require("node-red");


var app = express();

app.use('/', express.static("static"));

app.get('/roomcast/test', function(req,res){
	res.send("hello!!");	
});

var server = http.createServer(app);

var io = require('socket.io').listen(server);

io.on('connection', function(socket){
  console.log('a user connected');
});

var settings = {
	httpAdminRoot:"/red",
	httpNodeRoot: "/api",
	userDir:"/home/tlodge/.nodered",
	functionGlobalContext: {}
};


RED.init(server,settings);

app.use(settings.httpAdminRoot, RED.httpAdmin);
app.use(settings.httpNodeRoot, RED.httpNode);

server.listen(8080);
RED.start();