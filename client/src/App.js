// import React from 'react';
import React, { Component } from "react";
import openSocket from 'socket.io-client';
import Nav from "./components/Nav";
import './App.css';
import PlayNow from "./pages/PlayNow";
import UserHome from "./pages/UserHome";
import MultiPlayer from "./pages/MultiPlayer";
import CategoryTest from "./pages/CategoryTest.js";
import GameContainer from "./pages/GameContainer";
import Matchmaking from "./pages/Matchmaking";
import SingleGameContainer from "./pages/SPGameContainer";
import NoMatch from "./pages/NoMatch";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


// import SinglePlayerGameContainer from './SingleGameContainer';
// const socket = openSocket("http://localhost:3001", {transports: ['websocket']});


class App extends Component {
  state = {
    socketId: "test",
    userId: "testy test",
    email: "test.gmail.com"
  }

  componentDidMount = () => {
    this.connectSocket();
  }

  connectSocket = () => {
    socket.on('connect', function () {
      console.log('connected!');
      socket.emit('greet', { message: 'Hello Mr.Server!' });
    });
  }

  socket.on('disconnect', function(){
    socket.emit('disconnect', {message: 'User disconnected'});
  });

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/play" component={PlayNow} />
            <Route exact path="/game" component={GameContainer} />
            <Route path="/multicat" component={CategoryTest} />
            <Route path="/matchmaking" component={Matchmaking} />
            <Route exact path="/singlegame" component={SingleGameContainer} />
            <Route exact path="/multi/" component={MultiPlayer} />
            
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;








