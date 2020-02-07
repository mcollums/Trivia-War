import React, { Component } from "react";
import { withRouter, Redirect } from 'react-router-dom'
// import Jumbotron from "../components/Jumbotron";
import Leaderboard from "../components/Leaderboard";
import Button from "../components/Button/Button";

import Modal from 'react-modal';
import axios from 'axios';
import API from "../utils/API.js";
import socketAPI from "../utils/socketAPI";
import '../styles/Authentication.scss'

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
        registerOpen: false
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

    // Login and redirect 
    handleFormSubmit = event => {
        event.preventDefault();
        const { email, password } = this.state
        axios.post('/login', { email, password })
            .then(result => {
                socketAPI.publishLogin(email);
                this.setState({ redirectTo: "/home" });
            })
            .catch(err => {
                this.setState({ loginErrorMessage: "*Please enter a valid email or password" })
            })
    }

    //User registration and redirect
    handleFormRegister = event => {
        event.preventDefault();
        const { username, picLink, email, password } = this.state
        const emailReg = /^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/;
        if (!username || !picLink || !email || !password) {
            this.setState({ registerErrorMessage: "*Please fill in all fields" })
        }
        else if(password.length < 6) {
            this.setState({ registerErrorMessage: "*Password needs to be at least 6 characters" })
        }
        else if(!emailReg.test(email)) {
            this.setState({ registerErrorMessage: "*Please enter a valid email" })
        }
        else {
            axios.post("/register", { username, picLink, email, password })
                .then(result => {
                    window.location.href="/";
                })
                .catch(err => {
                    this.setState({ registerErrorMessage: "*Email is already in use" })
                })
        }
    }

    handleFormLogout = event => {
        event.preventDefault();
        API.logout().then(result => {
            this.setState({ welcomeEmail: "" })
        });
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
            });
    };

    componentDidMount() {
        // Mostly just for developing locally
        // if (window.location.pathname === "/api/google/callback") {
        //     const searchParams = new URLSearchParams(window.location.search);
        //     axios.post("/api/google/code", { code: searchParams.get('code') }).then(() => {
        //         this.setState({ redirectTo: "/" });
        //     })
        // } else {
        //     // this.loadProfileInfo()
        // }

        //Load top scores on mount
        this.loadUsers();
    };

    loadUsers() {
        API.getUsers()
            .then(res => {
                this.setState({
                    users: res.data
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={this.state.redirectTo} />
        }

        return (
            <div className="auth-main-con">
                <div className="log-in-con">
                    <h3>Welcome to Trivia War!</h3>
                    <p>Please feel free to create an account or use our guest login. guest@guest.com | password123</p>
                    {/* Login button */}
                    <button className="btn btn-dark authB" 
                            // id="authB" 
                            onClick={() => this.openModal("loginOpen")} 
                            data-target="#loginModal">Login
                    </button>

                    {/* Register button */}
                    <button className="btn btn-dark authB" 
                            // id="authB" 
                            onClick={() => this.openModal("registerOpen")} 
                            data-target="#registerModal">Register
                    </button>

                    {/* <Button
                        // onClick={()=> this.openModal("loginOpen")}
                        onClick={() => this.openModal("loginOpen")}
                        className="btn btn-dark"
                        data-target="#loginModal"
                    >Login</Button> */}


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

                <Leaderboard
                    leaders={this.state.users}
                    height='auto'
                    width='40%'
                />

            </div>
        )
    }
}

export default withRouter(Authentication);
