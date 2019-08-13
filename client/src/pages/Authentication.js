import React, { Component } from "react";
import { withRouter, Redirect } from 'react-router-dom'
import Jumbotron from "../components/Jumbotron";
import Modal from 'react-modal';
import axios from 'axios';
import API from "../utils/API.js";
import socketAPI from "../utils/socketAPI";

class Authentication extends Component {
    state = {
        users: [],
        username: "",
        picLink: "",
        email: "",
        password: "",
        loginErrorMessage: "",
        registerErrorMessage: "",
        welcomeEmail: "",
        googleSigninUrl: "",
        redirectTo: null,
        loginOpen: false,
        registerOpen: false,

    }


    openModal = modal => {
        this.setState({ [modal]: true });
    }

    closeModal = modal => {
        this.setState({ [modal]: false });
    }

    handleInput = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    // let's try and login   
    handleFormSubmit = event => {
        event.preventDefault();
        const { email, password } = this.state
        axios.post('/login', { email, password })
            .then(result => {
                // this.loadProfileInfo();
                socketAPI.publishLogin(email);
                // this.props.history.push("/home")
                this.setState({ redirectTo: "/home" });
            })
            .catch(err => {
                this.setState({ loginErrorMessage: "*Please enter a valid email or password" })
            })
    }

    handleFormRegister = event => {
        event.preventDefault();
        const { username, picLink, email, password } = this.state
        axios.post("/register", { username, picLink, email, password })
            .then(result => {
                // console.log(result.data)
                //this.loadProfileInfo()
                // this.props.history.push("/home")
                this.setState({ redirectTo: "/home" });
                console.log(result);
            })
            .catch(err => {
                // this.setState({ errorMessage: err })

                // res.json(err)
                // if (!username || !picLink || !email || !password) {
                //     this.setState({ errorMessage: "Please fill in all fields" })
                // }
                // else if (password <= 6) {
                //     this.setState({ errorMessage: "Password needs to be at least 6 characters" })
                // }
            })
    }


    handleFormLogout = event => {
        event.preventDefault()
        API.logout().then(result => {
            // console.log(result.data)
            this.setState({ welcomeEmail: "" })
        })
    }

    loadProfileInfo = () => {
        axios.get('/user/me')
            .then(response => {
                this.setState({ welcomeEmail: response.data.email })
            })
            .catch(err => {
                // axios.get("/api/google/url").then(response => {
                //     this.setState({ googleSigninUrl: response.data.url })
                // })
            })
    };

    componentDidMount() {
        // Mostly just for developing locally
        if (window.location.pathname === "/api/google/callback") {
            const searchParams = new URLSearchParams(window.location.search);
            axios.post("/api/google/code", { code: searchParams.get('code') }).then(() => {
                this.setState({ redirectTo: "/" });
            })
        } else {
            // this.loadProfileInfo()
        }
        this.loadUsers();
    };

    loadUsers() {
        API.getUsers()
            .then(res => {
                // console.log(res.data)
                this.setState({
                    users: res.data,
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={this.state.redirectTo} />
        }

        return (

            <div className="logCon">
                <div className="logInCon">

                    {/* Login button */}
                    <button className="btn btn-dark" id="authB" onClick={() => this.openModal("loginOpen")} data-target="#loginModal">Login</button>

                    {/* Login Modal */}
                    <Modal
                        ariaHideApp={false}
                        isOpen={this.state.loginOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={() => this.closeModal("loginOpen")}
                        // style={customStyles}
                        contentLabel="Example Modal"
                        id="loginModal"
                        style={{
                            overlay: {
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(52, 58, 64, 0.56)'
                            },
                            content: {
                                width: "350px",
                                height: "200px",
                                border: '1px solid #ccc',
                                background: '#fff',
                                overflow: 'auto',
                                WebkitOverflowScrolling: 'touch',
                                borderRadius: '4px',
                                outline: 'none',
                                padding: '20px'
                            }
                        }}
                    >
                        {/* Form inputs */}
                        <form>
                            <input onChange={this.handleInput} style={{ marginTop: "10px" }} name="email" value={this.state.email} type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp" placeholder="Enter email"></input>
                            <input onChange={this.handleInput} style={{ marginTop: "10px" }} name="password" value={this.state.password} type="password" className="form-control" id="loginPassword" placeholder="Password"></input>
                            {this.state.loginErrorMessage ? <div style={{ marginTop: "5px", color: "red", fontSize: "10px" }} className="fail">{this.state.loginErrorMessage}</div> : null}

                            <button type="submit" style={{ marginTop: "15px", marginLeft: "40%" }} className="btn btn-dark" onClick={this.handleFormSubmit}>Login</button>

                        </form>
                    </Modal>


                    {/* Register button */}
                    <button className="btn btn-dark" id="authB" onClick={() => this.openModal("registerOpen")} data-target="#registerModal">Register</button>

                    {/* Register modal */}
                    <Modal
                        ariaHideApp={false}
                        isOpen={this.state.registerOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={() => this.closeModal("registerOpen")}
                        // style={customStyles}
                        contentLabel="Example Modal"
                        id="registerModal"
                        style={{
                            overlay: {
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(52, 58, 64, 0.56)'
                            },
                            content: {
                                width: "350px",
                                height: "300px",
                                border: '1px solid #ccc',
                                background: '#fff',
                                overflow: 'auto',
                                WebkitOverflowScrolling: 'touch',
                                borderRadius: '4px',
                                outline: 'none',
                                padding: '20px'
                            }
                        }}
                    >
                        {/* Form inputs */}
                        <form>
                            <input onChange={this.handleInput} style={{ marginTop: "10px" }} name="username" value={this.state.username} type="text" className="form-control" id="registerName" aria-describedby="emailHelp" placeholder="Enter Your Name"></input>
                            <input onChange={this.handleInput} style={{ marginTop: "10px" }} name="picLink" value={this.state.picLink} type="text" className="form-control" id="registerImage" aria-describedby="emailHelp" placeholder="Link to your image"></input>
                            <input onChange={this.handleInput} style={{ marginTop: "10px" }} name="email" value={this.state.email} type="email" className="form-control" id="registerEmail" aria-describedby="emailHelp" placeholder="Enter email"></input>
                            <input onChange={this.handleInput} style={{ marginTop: "10px" }} name="password" value={this.state.password} type="password" className="form-control" id="registerPassword" placeholder="Password"></input>
                            {this.state.registerErrorMessage ? <div style={{ marginTop: "5px", color: "red", fontSize: "10px" }} className="fail">{this.state.registerErrorMessage}</div> : null}

                            <button type="submit" className="btn btn-dark" style={{ marginTop: "20px", marginLeft: "38%" }} onClick={this.handleFormRegister}>Register</button>

                        </form>
                    </Modal>
                </div>

                {/* Leader board */}
                <Jumbotron style={{ height: "auto" }}>
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
                            {/* Map each user data to leader board */}
                            {
                                this.state.users.slice(0, 5).map((user, index) => {
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

            </div>
        )
    }
}

export default withRouter(Authentication);
