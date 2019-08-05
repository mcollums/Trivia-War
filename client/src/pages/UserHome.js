import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";

class UserHome extends Component {

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
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>

        )
    }
}

export default UserHome;
