import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API"

class UserHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: "",
            users: [],
            redirectTo: null
        };
    }

    componentDidMount() {
        console.log("USER HOME RENDER");
        //on page load, check to see if the user is in the database
        //then set that user in the state
        API.checkAuth()
            .then(response => {
                    this.setState({
                        currentUser: response.data
                    }, () => {
                        console.log("Current User State ", this.state.currentUser)
                    })
                    
            })
            .catch(err => {
                // this runs if the user is NOT logged in
                this.setState({ redirectTo: "/" })
            });

        //Find the other database users for the leaderboard
        // this.loadUsers();        
    }

    loadUsers() {
        API.getUsers()
            .then(res => {
                console.log(res.data)
                this.setState({
                    users: res.data
                })
                // console.log(res.data)
            })
            .catch(err => console.log(err));
    }

    handlePlayNowBtn = (userId) => {
        let path = "/play";
        this.props.history.push(path);
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={this.state.redirectTo} />
        }
        return (
            <Container fluid>
                <Row>
                    <Col size="lg-5 md-12 sm-12">
                        <Jumbotron addClass="userData" jumboHeight="80%">
                            {/* User image goes here */}
                            <img style={{width:"200px"}} alt={""} src={this.state.currentUser.picLink} />
                            <div>
                                <strong>Name: </strong> {this.state.currentUser.username}
                            </div>
                            <div>
                                <strong>Wins:</strong> {this.state.currentUser.totalWins}
                            </div>
                            <div>
                                <strong>Losses:</strong> {this.state.currentUser.totalLosses}
                            </div>
                            <div>
                                <strong>Ranking:</strong> {this.state.currentUser.email}
                            </div>
                        </Jumbotron>
                    </Col>
                    <Col size="lg-7 md-12 sm-12">
                        <Jumbotron jumboHeight="80%">
                            <h4>LEADER BOARD</h4>
                            <table className="table">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Ranking</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Wins</th>
                                        <th scope="col">Losses</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.users.map((user, index) => {
                                            return (
                                                <tr key={index + 1}>
                                                    <td>{index + 1}</td>
                                                    <td>{user.username}</td>
                                                    <td>{user.totalWins}</td>
                                                    <td>{user.totalLosses}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col size="lg-12 md-12 sm-12">
                        <button className="btn btn-primary" onClick={() => this.handlePlayNowBtn(this.state.currentUser._id)}>Play Game</button>
                    </Col>
                </Row>
            </Container>

        )
    }
}

export default withRouter(UserHome);
