'use strict';
//apply strict mode to js file (variables must be declared before they are used and more)

//IMPORTS
const express = require('express');
//import express module
const WebSocket = require('ws');
//import ws module
const path = require('path');
//import path module

//NOTE: modules are packages; they are the same thing!

const PORT = process.env.PORT || 3000;
//set PORT to environment port, or if it is in use, set to port 3000


//SERVER
//Server begins listening on port
const server = express().listen(PORT, function(){
	console.log(`Listening on ${ PORT }`);
	//print to console that it is listening
});
//the variable server gets a http.Server object

const SocketServer = require('ws').Server;
//obtain the Server class in the ws module
const wss = new SocketServer({server});
//create an object of the WebSocket.Server class, using the http.Server object for port information???


//Execute upon connection event (emitted when handshake is complete)
wss.on('connection', function(ws){
  /*
  Callback parameters:
  ws = web socket - represents websocket that is connected
  */
  console.log('Client connected'); 
  //print to console that client is connected

  ws.on('message', function incoming(data) {
	  wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
	  });
  });
  ws.on('close', function(){
  	console.log('Client disconnected');
  });
}


//keep awake
const http = require("http");
//import http module

//Runs callback repeatedly
setInterval(function() {
    http.get("http://mark-program.herokuapp.com");
}, 300000); // every 5 minutes (300000)

/*setInterval function...
PARAMETERS:
callback, delay...args (optional arguments for callback)
*/
