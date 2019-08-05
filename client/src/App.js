import React from 'react';
import Container from "./components/Container";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import './App.css';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    
      
    <div className="App">
      <Header> 
        Trivia Game
      <Nav></Nav>
      </Header>
      <Container> </Container>
      <Footer></Footer>
    </div> 
      
      

      

    
  );
}

export default App;
