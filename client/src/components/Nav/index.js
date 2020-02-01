import React, { Component } from "react";
import API from "../../utils/API.js";
import { Link } from "react-router-dom";
import './navStyle.css';

class Nav extends Component {

  handleLogout = () => {
    API.logout().catch(err => console.log(err));
  }

  render() {
    return (
      <nav style={{ backgroundColor: "#62cbc2" }} className="navbar navbar-light" >
        <button style={{ border: "none" }} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span style={{ borderColor: "black" }} className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">

            <li className="nav-item active" data-toggle="collapse" data-target=".navbar-collapse">
              <Link to="/home" className="nav-link primary-link">Home</Link>
            </li>
            
            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse">
              <Link to="/play" className="secondary-link">Play Now</Link>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/" onClick={this.handleLogout}>Logout</a>
            </li>

          </ul>
        </div>
        <Link to="/home" className="nav-link logo-link" >TRIVIA WAR</Link>
      </nav>
    );
  }
}

export default Nav;
