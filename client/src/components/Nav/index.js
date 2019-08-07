import React from "react";

function Nav() {
  return (
    <nav style={{ backgroundColor: "#62cbc2" }} className="navbar navbar-light" >
      <button style={{ border: "none" }} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span style={{ borderColor: "black" }} className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <a style={{ fontSize: "25px", fontFamily: "'Warnes', cursive" }} className="nav-link" href="/home">Home <span className="sr-only"></span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/play">Play Now</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Logout</a>
          </li>
          {/* <li className="nav-item">
        <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </li> */}
        </ul>
        {/* <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form> */}
      </div>
      <a style={{ fontSize: "30px", fontFamily: "'Yatra One', cursive", marginRight: "45%" }} className="navbar-brand" >TRIVIA WAR</a>


      );
    }
    
    export default Nav;
