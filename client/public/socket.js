//
$(function(){

    var socket = io();
    
    socket.on('disconnect', function () {
        log('you have been disconnected');
      });






})
