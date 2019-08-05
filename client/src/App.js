import React from 'react';
import GameContainer from './GameContainer';
// added by jyoti for scoket.io
import openSocket from 'socket.io-client';
const socket = openSocket("http://localhost:3001");

function App() {
  return (
    <GameContainer />
  );
}

export default App;
