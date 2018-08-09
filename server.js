'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const path = require('path');
const fs = require('file-system');

const PORT = process.env.PORT || 3000;

const server = express()
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

var testFile = fs.readFileSync('public/test.json');
var contents = JSON.parse(testFile);

wss.on('connection', (ws) => {

  console.log('Client connected');

  ws.on('message', function incoming(data) {
	  wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {

        client.send(contents.testelement);

      }
	  });
  });
  ws.on('close', () => console.log('Client disconnected'));
});


//keep awake
const http = require("http");
setInterval(function() {
    http.get("http://mark-program.herokuapp.com/");
}, 300000); // every 5 minutes (300000)
