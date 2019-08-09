import openSocket from 'socket.io-client';

const socket = openSocket(process.env.SOCKET_URL || 'http://localhost:3001')

export default {
    subscribeTimer: (callback) => {
        socket.on("timer", time => callback(time))
    },

    publishLogin: email => {
        socket.emit("setuser", { email })
    },
    subscribeAuthorized: callback => {
        socket.on("authorized", message => callback(message))
    },

    publishSeekGame: () => {
        socket.emit("seekGame", {})
    },

    // subscribedJoinedGame: callback => {
    //     socket.on("joinedGame", info => {
    //         // callback(info);
    //     },


    // subcribeSeekError: callback => {
    //     socket.on("seekError", message => {
    //         callback(message)
    //     })
    // },






    disconnect() {
        socket.disconnect()
    }
}