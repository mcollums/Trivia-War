import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import {List, ListItem} from "../components/List"
import API from "../utils/API"

class UserHome extends Component {
    state = {
        users: [],
        name: "",
        picLink: "",
        totalWins: "",
        totalLosses: ""
      };

      componentDidMount() {
        this.loadUsers();
      }

      loadUsers(){
        API.getUsers()
      .then(res =>
        this.setState({ users: res.data, name: "", picLink: "", totalWins: "", totalLosses: "" })
      )
      .catch(err => console.log(err));
      }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-5 sm-12">
                        <Jumbotron addClass="userData">
                            {/* User image goes here */}
                            <img alt={""} src={""} />
                            <ul>
                                <ul>
                                    <strong>Name:</strong> {""}
                                </ul>
                                <ul>
                                    <strong>Wins:</strong> {""}
                                </ul>
                                <ul>
                                    <strong>Losses:</strong> {""}
                                </ul>
                                <ul>
                                    <strong>Ranking:</strong> {""}
                                </ul>
                            </ul>
                        </Jumbotron>
                    </Col>
                    <Col size="md-7 sm-12">
                        <Jumbotron>
                            <h4>LEADER BOARD</h4>
                            {console.log(this.state)}
                        </Jumbotron>
                        {this.state.users.length ? (
                            <List>
                                {this.state.users.map(user => (
                                    <ListItem key={user._id}>
                                        
                                            <strong>
                                                <ul>{user.name}</ul>
                                                <ul>Wins: {user.totalWins}</ul>
                                                <ul>Losses: {user.totalLosses}</ul>
                                            </strong>
                                        
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                        <h3>No Results to Display</h3>
                        )}
                    </Col>
                </Row>
            </Container>

        )
    }
}

export default UserHome;
