import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import API from "../utils/API"

import '../styles/UserHome.scss'
import { Container, Row, Col, Button, Jumbotron } from 'react-bootstrap';
import Leaderboard from "../components/Leaderboard"

class UserHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            userInfo: {},
            redirectTo: null,
            userInfoFromDB: {},
            ranking: ""
        };
    }

    componentDidMount() {
        this.loadUserData();
    }

    loadUserById() {
        const id = this.state.userInfo.id
        API.getOneUser(id)
            .then(res => {
                this.setState({
                    userInfoFromDB: res.data,
                })
            })
            .catch(err => console.log(err));
    }

    loadUserData() {
        API.checkAuth()
            .then(response => {
                // this runs if the user is logged in
                this.setState({
                    userInfo: response.data
                },
                    this.loadUsers
                );
                this.loadUserById();
            })
            .catch(err => {
                // this runs if the user is NOT logged in
                this.setState({ redirectTo: "/" })
            })
    }

    loadUsers() {
        API.getUsers()
            .then(res => {
                this.setState({
                    users: res.data,
                },
                    this.findRanking)
            })
            .catch(err => console.log(err));
    }

    findRanking = () => {
        let ranking = 0;
        let allUsers = this.state.users;
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i]._id === this.state.userInfo.id) {
                ranking = (i + 1);
                break;
            }
        }
        this.setState({
            ranking: ranking
        })
    }

    handlePlayNowBtn = () => {
        let path = "/play";
        this.props.history.push(path);
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={this.state.redirectTo} />
        }
        return (
            <>
                <Container id="userHome-cont">
                    <Row>
                        <Col id="user-col">
                            <h2>Welcome, {this.state.userInfoFromDB.username}!</h2>
                            <Row id="user-info-row" className="d-flex justify-content-around">
                                <Col className="p-3" md="4">
                                    <img
                                        alt={"user's profile image"}
                                        src={this.state.userInfoFromDB.picLink} />
                                </Col>
                                <Col className="p-3" md="4">
                                    <h5><strong>Name: </strong> {this.state.userInfoFromDB.username}</h5>
                                    <h5><strong>Wins:</strong> {this.state.userInfoFromDB.totalWins}</h5>
                                    <h5><strong>Losses:</strong> {this.state.userInfoFromDB.totalLosses}</h5>
                                    <h5><strong>Ranking:</strong> {this.state.ranking}</h5>
                                    <Button className="btn btn-primary btn-dark"
                                        style={{ marginBottom: "20px" }}
                                        onClick={() => this.handlePlayNowBtn()}>
                                        Play Game
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Jumbotron id="userHome-leaderboard" className="leaderboard-jumbo">
                                <Leaderboard
                                    leaders={this.state.users}
                                />
                            </Jumbotron>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default withRouter(UserHome);
