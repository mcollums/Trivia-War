import openSocket from 'socket.io-client';

const socket = openSocket(process.env.SOCKET_URL || 'http://localhost:3001')

export default {
    subscribeTimer: (callback) => {
        socket.on("timer", time => callback(time))
    },

    publishLogin: email => {
        socket.emit("setuser", { email } )
    },
    subscribeAuthorized: callback => {
        socket.on("authorized", message => callback(message))
    },

    publishSeekGame: (callback) => {
        socket.emit("seekGame") {

    }
    
        eJoinedGame: (callback) => {
    socket.on("joinedGame", info => callback(info))
},

    cribeSeekError: callback => {
    socket.on("seekError", message => {
            callback(message)
        })
    },


    



    disconnect(){
        socket.disconnect()
    }
}