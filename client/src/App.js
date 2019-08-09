// import React from 'react';
import React, { Component } from "react";
// import openSocket from 'socket.io-client';
import socketAPI from './utils/socketAPI';
import Nav from "./components/Nav";
import './App.css';
import PlayNow from "./pages/PlayNow";
import Authentication from "./pages/Authentication";
import UserHome from "./pages/UserHome";
import MultiPlayer from "./pages/MultiPlayer";
import CategoryTest from "./pages/CategoryTest.js";
import GameContainer from "./pages/GameContainer";
import Matchmaking from "./pages/Matchmaking";
import SingleGameContainer from "./pages/SPGameContainer";
import NoMatch from "./pages/NoMatch";
import SingleCategory from "./pages/SingleCategory";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// const socket = openSocket("http://localhost:3001", {transports: ['websocket']});

class App extends Component {
  state = {
    socketId: "1234",
    userId: "testy test",
    email: "test.gmail.com",
    authorized: false,
    inGame: false
  }

  componentDidMount = () => {
    // this.socketSubscribeAuthorized();

    // socketAPI.subscribeAuthorized(message => {
    //   console.log(message)
    //   if(message === true){
    //     this.setState({authorized: true})
    //   }
    // })
    // socketAPI.subscribeJoinedGame(info => {
    //   console.log(info);
    //   this.setState({inGame: true})
    // })


    // setTimeout(() => {
    //   socketAPI.publishLogin("robert@email.com")
    // }, 1000)

    // setTimeout(() => {
    //   socketAPI.publishSeekGame()
    // }, 2000)
  }

  socketSubscribeAuthorized = () =>{
    socketAPI.subscribeAuthorized(message => {
      console.log(message)
      if(message === true){
        this.setState({authorized: true})
      }
    });
  }

  socketPublishLogin = (email) => {
    socketAPI.publishLogin(email);
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Authentication} />
            <Route exact path="/home" component={() => <UserHome socketPublishLogin={this.socketPublishLogin} 
                  socketSubscribeAuthorized={this.socketSubscribeAuthorized} />} />
            <Route exact path="/play" component={PlayNow} />
            <Route exact path="/game" component={GameContainer} />
            <Route path="/multicat" component={CategoryTest} />
            <Route path="/matchmaking" component={Matchmaking} />
            <Route exact path="/singlegame" component={SingleGameContainer} />
            <Route exact path="/multi/" component={MultiPlayer} />
            <Route exact path="/single" component={SingleCategory} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;




