import React from 'react';
// import Container from "./components/Container";
// import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import UserHome from "./pages/UserHome";
import MultiPlayer from "./pages/MultiPlayer";
import GameContainer from "./GameContainer";
import './App.css';

function App() {
  return (
   
      <div>
        <Nav />
        <UserHome />
        <MultiPlayer />
        <GameContainer />
        <Footer></Footer>
      </div>
      

  );
}

export default App;

// export default App;
      
//     <div className="App">
//       <Header> 
//       <GameContainer/>
//         Trivia Game
//       <Nav></Nav>
//       </Header>
//       <Container> </Container>
//       <Footer></Footer>
//     </div> 

//   )
// };

  




      
      

      

    


