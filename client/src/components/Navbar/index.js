import React, { Component } from "react";
import './navStyle.scss';
//Component imports
import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';
//API imports
import API from "../../utils/API.js";


class NavBarCustom extends Component {

  handleLogout = () => {
    API.logout().catch(err => console.log(err));
  }

  render() {
    return (
      <>
        <Nav className="navbar-main"
          activeKey="/home"
        >
          <Nav.Item>
            <Nav.Link id="home-nav-link" href="/home">
              <Link to="/home" className="link">Home</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link id="logout-nav-link" eventKey="link-1">
              <Link to="/" className="link" onClick={this.handleLogout}>Logout</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link id="about-nav-link" eventKey="link-2">
              <Link to="/play" className="link">Play Now</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="float-right">
            <Nav.Link id="logo-nav-link" eventKey="link-3">
              <Link to="/home" className="link logo-link">TRIVIA WAR</Link>
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <hr class="nav-hr" />
      </>
    );
  }
}

export default NavBarCustom;
