import React, { Component } from "react";
// import Category from "../components/Category";
import { Redirect, withRouter } from "react-router-dom";
import socketAPI from "../utils/socketAPI";


class MultiPlayer extends Component {
    state = {
        categories: ["animals", "geography", "science"]
    }

    componentDidMount() {
        socketAPI.subscribeMatchmaking((message) => {
            //this message says that the player is waiting in matchmaking
            console.log(message);
            //function that shows matchmaking modal
        });

        socketAPI.subscribeJoinedGame((userId) => {
            console.log("Found a session with user...", userId);
            this.props.history.push('/game');
        });

        socketAPI.subscribeGameStart((sessionId) => {
            console.log("Your session id is...", sessionId);
        });
    }

    publishSeekGame = (category) => {
        console.log("Looking for a Session to create or join.");
        socketAPI.publishSeekGame(category);
    }

    handleCatSelect = selection => {
        console.log("User chose: " + selection);
        let category = selection;
        this.publishSeekGame(category);
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={this.state.redirectTo} />
        }
        return (
            <div className="scatContain">
                {this.state.categories.map(cat =>
                    // <Link to="/game">
                        <div key={cat} className="mcategory" id={cat} onClick={() => { this.handleCatSelect(cat) }}>
                            <div className="mcatcat">
                                <h4>{cat}</h4>
                            </div>
                        </div>
                    // </Link>
                )}
            </div>
        )
    };
}


export default withRouter(MultiPlayer);