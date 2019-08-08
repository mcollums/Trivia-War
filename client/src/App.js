import React from 'react';
// import Container from "./components/Container";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
import Nav from "./components/Nav";
import UserHome from "./pages/UserHome";
import MultiPlayer from "./pages/MultiPlayer";
import './App.css';
import PlayNow from "./pages/PlayNow";
import GameContainer from "./pages/GameContainer";
import SingleCategory from "./pages/SingleCategory";
import NoMatch from "./pages/NoMatch";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// added by jyoti for scoket.io
import openSocket from 'socket.io-client';
const socket = openSocket("http://localhost:3001");


function App() {
  return (

   
      // <div>
      //   <Nav />
      //   <UserHome />
      //   <MultiPlayer />
      //   <GameContainer />
      //   <Footer></Footer>
      

    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/home" component={UserHome} />
          <Route exact path="/play" component={PlayNow} />
          <Route exact path="/game" component={GameContainer} />
          <Route exact path="/multi/" component={MultiPlayer} />
          <Route exact path="/single/" component={SingleCategory} />
          
          <Route component={NoMatch} />
        </Switch>
        {/* <Footer></Footer> */}

      </div>
    </Router>
    // </div>
  );
  
}

export default App;




