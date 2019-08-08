// const SOCKET = require("../src/utils/socketAPI.js/index.js");

$(function () {

  // var socket = io();

  socket.on('userConnected', function(data){
    console.log("User connected to socket.js");
  })
  // Sets the client's username
  function setUsername() {
    // username = cleanInput($usernameInput.val().trim());

    // If the username is valid
    if (username) {
      $loginPage.fadeOut();
      $chatPage.show();
      $loginPage.off('click');
      $currentInput = $inputMessage.focus();

      // Tell the server your username
      socket.emit('add user', username);

    }
  }

  socket.on('disconnect', function () {
    log('you have been disconnected');
  });






})
