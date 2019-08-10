import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import { withRouter,  Redirect } from 'react-router-dom'
import Jumbotron from "../components/Jumbotron";
import Modal from 'react-modal';
import axios from 'axios';
import API from "../utils/API.js";
import socketAPI from "../utils/socketAPI";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class Authentication extends Component {
    state = {
        users: [],
        username: "",
        picLink: "",
        email: "",
        password: "",
        errorMessage: "",
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

    // let's try and login   
    handleFormSubmit = event => {
        event.preventDefault()
        const { email, password } = this.state
        axios.post('/login', {email, password})
            .then(result => {
                // this.loadProfileInfo();
                socketAPI.publishLogin(email)
                this.props.history.push("/home")
                // this.setState({ redirectTo: "/home" });
            })
            .catch(err => {
                this.setState({ errorMessage: "Please enter a valid email or password" })
            })
    }

    handleFormRegister = event => {
        event.preventDefault()
        const { username, picLink, email, password } = this.state
        axios.post("/register", { username, picLink, email, password })
            .then(result => {
                console.log(result.data)
                //this.loadProfileInfo()
                // this.props.history.push("/home")
                this.setState({ redirectTo: "/home" });
            }).catch(err => {
                if (!this.state.username) {
                    this.setState({ errorMessage: "Please enter a valid name" })
                }
                else if (!this.state.password && this.state.password.length < 6) {
                    this.setState({ errorMessage: "Password needs to be at least 6 characters" })
                }
            })
    }

    handleFormLogout = event => {
        event.preventDefault()
        API.logout().then(result => {
            console.log(result.data)
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
    }

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
    }

    loadUsers() {
        API.getUsers()
            .then(res => {
                // console.log(res.data)
                this.setState({
                    users: res.data,
                })
                console.log(res.data)
            })
            .catch(err => console.log(err));
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={this.state.redirectTo} />
        }

        return (

            <Container fluid>
                <Row>
                    <Col size="lg-5 md-12 sm-12">
                        <Jumbotron style={{maxHeight:"300px",maxWidth:"200px"}}>
                            <Row>
                                <Col size="6">

                                    {/* <!-- Button trigger modal --> */}
                                    {/* <button type="button" className="btn btn-dark" data-toggle="modal" data-target="#loginModal">
                                        Login
                                    </button>
                                    <div>
                                        Email: <input name="email" type="text" value={this.state.email} onChange={this.handleInput}/>
                                        Password <input name="password" type="text" value={this.state.password} onChange={this.handleInput}/>
                                        <button type="submit" className="btn btn-dark" onClick={this.handleFormSubmit}>Submit</button>
                                    </div>
                                    </button> */}
                                    {/* <!-- Modal --> */}
                                    {/* <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalCenterTitle">{this.state.welcomeEmail.length > 0
                                                        ? "Welcome " + this.state.welcomeEmail
                                                        : "Login"} </h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body"> */}
                                    {/* {
                                                        this.state.googleSigninUrl.length > 0 && this.state.welcomeEmail.length === 0
                                                            ? (<h3>Sign in with <a href={this.state.googleSigninUrl} >google </a></h3>)
                                                            : ""
                                                    } */}
                                    {/* <form>
                                                        <div className="form-group">
                                                            <input onChange={this.handleInput} name="email" value={this.state.email} type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp" placeholder="Enter email"></input>
                                                        </div>
                                                        <div className="form-group">
                                                            <input onChange={this.handleInput} name="password" value={this.state.password} type="password" className="form-control" id="loginPassword" placeholder="Password"></input>
                                                        </div>
                                                        {this.state.errorMessage ? <div className="fail">{this.state.errorMessage}</div> : null}
                                                        <button type="submit" className="btn btn-dark" onClick={this.handleFormSubmit}>Submit</button>
                                                    </form>
                                                </div>

                                            </div>
                                        </div>
                                    </div> */}
                                
                                    <button className="btn btn-dark" onClick={() => this.openModal("loginOpen")} data-target="#loginModal">Login</button>

                                    <Modal
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
                                                width: "400px",
                                                height: "200px",
                                                position: 'fixed',
                                                top: '25%',
                                                left: '25%',
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

                                        {/* <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2> */}
                                        {/* <button onClick={() => this.closeModal("loginOpen")}>close</button> */}
                                        {/* <div>I am a modal</div> */}
                                        <form>
                                            <input onChange={this.handleInput} style= {{marginTop:"10px"}} name="email" value={this.state.email} type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp" placeholder="Enter email"></input>
                                            <input onChange={this.handleInput} style= {{marginTop:"10px"}} name="password" value={this.state.password} type="password" className="form-control" id="loginPassword" placeholder="Password"></input>
                                            <button type="submit" style= {{marginTop:"20px", marginLeft:"40%"}} className="btn btn-dark" onClick={this.handleFormSubmit}>Login</button>

                                        </form>
                                    </Modal>
                                  
                                </Col>

                                <Col size="6">
                                    <button className="btn btn-dark" onClick={() => this.openModal("registerOpen")} data-target="#registerModal">Register</button>

                                    <Modal
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
                                                width: "400px",
                                                height: "300px",
                                                position: 'fixed',
                                                top: '25%',
                                                left: '25%',
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

                                        {/* <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2> */}
                                        {/* <button onClick={() => this.closeModal("registerOpen")}>close</button> */}
                                        {/* <div>I am a modal</div> */}
                                        <form>
                                            <input onChange={this.handleInput} style= {{marginTop:"10px"}} name="username" value={this.state.username} type="text" className="form-control" id="registerName" aria-describedby="emailHelp" placeholder="Enter Your Name"></input>
                                            <input onChange={this.handleInput} style= {{marginTop:"10px"}} name="picLink" value={this.state.picLink} type="text" className="form-control" id="registerImage" aria-describedby="emailHelp" placeholder="Link to your image"></input>
                                            <input onChange={this.handleInput} style= {{marginTop:"10px"}} name="email" value={this.state.email} type="email" className="form-control" id="registerEmail" aria-describedby="emailHelp" placeholder="Enter email"></input>
                                            <input onChange={this.handleInput} style= {{marginTop:"10px"}} name="password" value={this.state.password} type="password" className="form-control" id="registerPassword" placeholder="Password"></input>
                                            <button type="submit" className="btn btn-dark" style= {{marginTop:"20px", marginLeft:"38%"}} onClick={this.handleFormRegister}>Register</button>

                                        </form>
                                    </Modal>
                                    {/* <!-- Button trigger modal --> */}
                                    {/* <button type="button" className="btn btn-dark" data-toggle="modal" data-target="#registerModal">
                                        Register
                                    </button> */}

                                </Col>
                            </Row>

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
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>

        )
    }
}

export default withRouter(Authentication);
