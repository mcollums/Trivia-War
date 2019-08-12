import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API"

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
        // const id = this.props.match.params.id
        console.log("User ID " + this.state.userInfo.id)
        const id = this.state.userInfo.id
        API.getOneUser(id)
            .then(res => {
                // console.log(res.data);
                // UsersInfo.push(res.data);
                this.setState({
                    userInfoFromDB: res.data,
                })
                console.log(this.state.userInfoFromDB)
            })
            .catch(err => console.log(err));
    }

    findRanking = () => {
        let ranking = 0;
        let allUsers = this.state.users;
        // console.log(allUsers);
        for (let i = 0; i < allUsers.length; i++) {
            if(allUsers[i]._id === this.state.userInfo.id){
                ranking = (i + 1);
                // console.log("user Found " + i)
                // console.log(ranking)
                break;
            }
            // console.log(allUsers[i]);
        }
        this.setState({
            ranking: ranking
        })
    }
    
    loadUserData(){
        API.checkAuth()
            .then(response => {
                // this runs if the user is logged in
                // console.log("response: ", response.data)
                this.setState({userInfo:response.data}, this.loadUsers);
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
                // console.log("All users",res.data);
                this.setState({
                    users: res.data,
                }, 
                this.findRanking
                )
                // console.log(res.data)
            })
            .catch(err => console.log(err));
    }

    handlePlayNowBtn = () => {
        let path = "/play";
        this.props.history.push(path);
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={this.state.redirectTo} />
        }
        console.log("USER HOME RENDER");
        return (
            <div className="playnowContain">
                
                        <div addClass="userData" id="userCon">
                            {/* User image goes here */}
                            <img style={{maxWidth:"300px", maxHeight:"200px", borderRadius:"7%"}} alt={""} src={this.state.userInfoFromDB.picLink} />
                            <div className="name" style={{paddingTop: "25px"}}>
                                <strong>Name: </strong> {this.state.userInfoFromDB.username}
                            </div>
                            <div>
                                <strong>Wins:</strong> {this.state.userInfoFromDB.totalWins}
                            </div>
                            <div>
                                <strong>Losses:</strong> {this.state.userInfoFromDB.totalLosses}
                            </div>
                            <div className="ranking" style={{paddingBottom: "30px"}}>
                                <strong>Ranking:</strong> {this.state.ranking}
                            </div>
                          
                                
                                    <button className="btn btn-primary btn-dark"  onClick={() => this.handlePlayNowBtn()}>Play Game</button>
                               
                        </div>
                    
                        <div className="leaderB">
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
                                        this.state.users.slice(0,5).map((user, index) => {
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
                        </div>
                    
                
            </div>

        )
    }
}

export default withRouter(UserHome);
