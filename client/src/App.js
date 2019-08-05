import React from "react";
import Nav from "./components/Nav";
import UserHome from "./pages/UserHome";
import MultiPlayer from "./pages/MultiPlayer";
import GameContainer from "./GameContainer";

function App() {
  return (
      <div>
        <Nav />
        <UserHome />
        <MultiPlayer />
        <GameContainer/>
      </div>
      
  );
}

export default App;
