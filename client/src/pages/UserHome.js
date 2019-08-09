import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API"

class UserHome extends Component {
    state = {
        users: [],
        userInfo: {},
        ranking: ""
    };

    componentDidMount() {
        this.loadUsers();
        this.loadUserById();
    }

    loadUsers() {
        API.getUsers()
            .then(res => {
                console.log(res.data)
                this.setState({
                    users: res.data,
                })
                // console.log(res.data)
            })
            .catch(err => console.log(err));
    }

    loadUserById() {
        // const id = this.props.match.params.id
        const id = "5d4b30a4c4bab282e768d221"
        API.getOneUser(id)
            .then(res => {
                console.log(res.data)
                this.setState({
                    userInfo: res.data,
                }, function(){
                    this.findRanking();
                })
                // console.log(res.data)
            })
            .catch(err => console.log(err));
    }

    findRanking = () => {
        let ranking = 0;
        let allUsers = this.state.users;
        for (let i = 0; i < allUsers.length; i++) {
            if(allUsers[i]._id === this.state.userInfo._id){
                ranking = (i + 1);
                console.log("user Founds" + i)
                console.log(ranking)
                break;
            }
            console.log(allUsers[i]);
        }
        this.setState({
            ranking: ranking
        })
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="lg-5 md-12 sm-12">
                        <Jumbotron addClass="userData" jumboHeight="80%">
                            {/* User image goes here */}
                            <img alt={""} src={this.state.userInfo.picLink} />
                            <div>
                                <strong>Name:</strong> {this.state.userInfo.name}
                            </div>
                            <div>
                                <strong>Wins:</strong> {this.state.userInfo.totalWins}
                            </div>
                            <div>
                                <strong>Losses:</strong> {this.state.userInfo.totalLosses}
                            </div>
                            <div>
                                <strong>Ranking:</strong> {this.state.ranking}
                            </div>
                        </Jumbotron>
                    </Col>
                    <Col size="lg-7 md-12 sm-12">
                        <Jumbotron jumboHeight="80%">
                            <h4>LEADER BOARD</h4>
                            <table class="table">
                                <thead class="thead-dark">
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
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{user.name}</td>
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
            </Container>

        )
    }
}

export default UserHome;