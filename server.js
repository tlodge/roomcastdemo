var http = require('http');
var express = require('express');
var RED = require("node-red");
var redis = require('redis');

var app = express();

app.use('/', express.static("static"));

var server = http.createServer(app);

var io = require('socket.io').listen(server);
var client = redis.createClient();



client.on('message', function (channel, message) {
	console.log("seen a message:");
	console.log(message);
	if (channel == "display"){
		io.emit('display', message);
	}
});

client.subscribe("display")

app.get('/roomcast/start', function(req,res){
	io.emit('display', 'hellooo!!');
	res.send("sending!!");	
});

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