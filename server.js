const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
var socketArr = [];

let clients = 0;
let users = [];
//Users will keep track of all socket users, their status and their name (?)

let sessions = [];
//Sessions will hold all the needed game information for the server
  //Player 1
  //Player 2
  //isOpen true/false
  //

// Added by jyoti for scoket connection 
var server = require('http').Server(app);
var io = require('socket.io')(server);
//Added by jyoti


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/trivia_masters");


io.on('connection', function (socket) {
  clients++;
  console.log('A user connected!', socket.id);
  // io.sockets.emit('broadcast', { description: clients + ' clients connected!' });
  socket.emit('userConnected', { socketId: socket.id });
  socket.emit('newclientconnect', { description: 'Hey, welcome!' });
  socket.broadcast.emit('newclientconnect', { description: clients + ' clients connected!' });
  socketArr.push(socket.id);
  console.log("Socket id  added :" + socketArr);
  socket.on('clicked', function (data) {
    console.log(data);
    io.sockets.emit('clicked', { data: socket.id });
  });
  socket.on('disconnect', function(data){
    let id = data.id
    console.log(data);
    socket.broadcast.emit('Client Disconnect', {data: socket.id});
    var thisUser = users.find(function(id) {
      return id;
    });
    console.log("User that disconnected: " + thisUser)
  });

});


// Start the API server
server.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
}); 