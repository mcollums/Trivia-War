import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { Container, Row, Col, Button, Jumbotron } from 'react-bootstrap';

import '../styles/PlayNow.scss'
import API from "../utils/API.js"

class PlayNow extends Component {
    state = {
        redirectTo: null
    };

    componentDidMount() {

        API.checkAuth()
            .then(response => {
                // this runs if the user is logged in
            })
            .catch(err => {
                // this runs if the uer is NOT logged in
                this.setState({ redirectTo: "/" })
            })
    }

    handleSinglePlay = () => {
        let path = "/single";
        this.props.history.push(path);
    }

    handleMultiPlay = () => {
        let path = "/multi";
        this.props.history.push(path);
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={this.state.redirectTo} />
        }

        return (
            <>
                <Container id="play-now-cont">
                    <Row className="mt-5">
                        <Col md={{span:8, offset: 2}}>
                            <h2>Instructions:</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit ipsa enim magnam iusto, aut magni veniam eum, totam aliquam ipsam molestiae quam? Nihil, nobis a deleniti dicta incidunt libero quaerat?</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit ipsa enim magnam iusto, aut magni veniam eum, totam aliquam ipsam molestiae quam? Nihil, nobis a deleniti dicta incidunt libero quaerat?</p>

                        </Col>
                    </Row>
                    <Row className="py-5 mx-0">
                        <Col>
                            {/* <div className="playnowContain"> */}
                            <div className="play-type-card" onClick={() => this.handleSinglePlay()}>
                                <h1 className="ml8">
                                    <span className="letters-container">
                                        <span className="letters letters-left">Single Player</span>
                                        {/* <span className="letters bang">!</span> */}
                                    </span>
                                    <span className="circle circle-white"></span>
                                    <span className="circle circle-dark"></span>
                                    <span className="circle circle-container">
                                        <span className="circle circle-dark-dashed"></span>
                                    </span>
                                </h1>

                            </div>
                        </Col>
                        <Col>
                            <div className="play-type-card"
                                onClick={() => this.handleMultiPlay()
                                }>
                                <h1 className="ml8">
                                    <span className="letters-container">
                                        <span className="letters letters-left">Multi-Player</span>
                                        {/* <span className="letters bang">!</span> */}
                                    </span>
                                    <span className="circle circle-white"></span>
                                    <span className="circle circle-dark"></span>
                                    <span className="circle circle-container">
                                        <span className="circle circle-dark-dashed"></span>
                                    </span>
                                </h1>
                            </div>
                            {/* </div> */}
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default withRouter(PlayNow);