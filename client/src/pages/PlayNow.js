import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import './Pages.css';
import API from "../utils/API.js"

class PlayNow extends Component {
    state = {
        redirectTo: null
    };

    componentDidMount() {

        API.checkAuth()
            .then(response => {
                // this runs if the user is logged in
                // console.log("response: ", response)
                console.log("user authenticated");
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
            <div className="playnowContain">
                    <div className="jumbotronz" onClick={() => this.handleSinglePlay()}>
                        <h1 className="ml8">
                            <span className="letters-container">
                                <span className="letters letters-left">Single Player</span>
                                <span className="letters bang">!</span>
                            </span>
                            <span className="circle circle-white"></span>
                            <span className="circle circle-dark"></span>
                            <span className="circle circle-container">
                                <span className="circle circle-dark-dashed"></span>
                            </span>
                        </h1>

                    </div>

                    <div className="jumbotronz" onClick={() => this.handleMultiPlay()}>
                    <h1 className="ml8">
                            <span className="letters-container">
                                <span className="letters letters-left">Multi - Player</span>
                                <span className="letters bang">!</span>
                            </span>
                            <span className="circle circle-white"></span>
                            <span className="circle circle-dark"></span>
                            <span className="circle circle-container">
                                <span className="circle circle-dark-dashed"></span>
                            </span>
                        </h1>
                    </div>
            </div>

        )
    }
}

export default withRouter(PlayNow);