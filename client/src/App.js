// import React from 'react';
import React, { Component } from "react";
// import openSocket from 'socket.io-client';
import socketAPI from './utils/socketAPI';
import Nav from "./components/Nav";
import './App.css';
import PlayNow from "./pages/PlayNow";
import Authentication from "./pages/Authentication";
import UserHome from "./pages/UserHome";
import MultiPlayerCat from "./pages/MultiPlayerCategory";
import GameContainer from "./pages/GameContainer";
import SingleGameContainer from "./pages/SPGameContainer";
import NoMatch from "./pages/NoMatch";
import SingleCategory from "./pages/SingleCategory";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// const socket = openSocket("http://localhost:3001", {transports: ['websocket']});

class App extends Component {
  state = {
    userEmail: "",
    authorized: false,
    inGame: false
  }

  componentDidMount = () => {
    socketAPI.subscribeAuthorized((message) => {
      // console.log("AUTHORIZED", message);
      if(message === true){
        this.setState({
          authorized: true
        }
          // () => {console.log("Application State: " + this.state)}
        )} else {console.log("State not updated")}
    })
  }

  publishLogin = (email) => {
    console.log("login");
    socketAPI.publishLogin(email);
  }

  render() {
    console.log("RENDER PARTY");
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Authentication} />
            <Route exact path="/home" component={() => <UserHome publishLogin={this.publishLogin} 
                  authorized={this.state.authorized} />} />
            <Route exact path="/play" component={PlayNow} />
            <Route exact path="/game" component={GameContainer} />
            <Route exact path="/singlegame" component={SingleGameContainer} />
            <Route exact path="/multi" component={MultiPlayerCat} />
            <Route exact path="/single" component={SingleCategory} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;




