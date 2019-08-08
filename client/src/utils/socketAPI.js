// export default {
//     // when the user disconnects.. perform this
//     socketDisconnect: function () {
//         socket.on('disconnect', function () {
//             if (addedUser) {
//                 --numUsers;
//                 // killGame(socket);

//                 // echo globally that this client has left
//                 socket.broadcast.emit('user left', {
//                     username: socket.username,
//                     numUsers: numUsers
//                 });
//             }
//         });
//     },

//     publishUserSelection: function() {
//         socket.emit('userSelection', {description: "The user selected something"});
//         console.log("The user selected something.");
//     }
// };
