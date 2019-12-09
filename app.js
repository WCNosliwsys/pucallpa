const express = require('express');
//create a new express application
const app = express();
//require the http module
const http = require('http').Server(app);
// require the socket.io module
const io = require('socket.io')(http);

var port = process.env.PORT || 5000;
var numuser =0;
//To listen to messages
io.on('connection', (socket)=>{
	numuser=numuser+1;
	console.log("Se conecto el usuario: "+ socket.id + " el numero de usuarios es: " + numuser);	
	socket.on('enviarmensaje',enviarmensaje);
	function enviarmensaje (mensaje,cb){     
		data={};
		data.mensaje=mensaje;
       // socket.broadcast.emit('recibirmensaje',data);
       io.emit('recibirmensaje',data);
       cb('OK');
   }

   socket.on('disconnect', function(){
   	numuser=numuser-1;
   	console.log("Se desconecto el usuario: "+ socket.id+ " el numero de usuarios es: " + numuser);
   });
});

//wire up the server to listen to our port 500
http.listen(port, ()=>{
	console.log('connected to port: ' + port)
});