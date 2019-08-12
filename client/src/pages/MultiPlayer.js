import React, { Component } from "react";
// import Category from "../components/Category";
import { Redirect, withRouter } from "react-router-dom";
import socketAPI from "../utils/socketAPI";
import Modal from 'react-modal';


class MultiPlayer extends Component {
    state = {
        categories: ["animals", "geography", "science"],
        matchmakingOpen: false,

    }
    // openModal = modal => {
    //     this.setState({ [modal]: true });
    // }

    componentDidMount() {
        socketAPI.subscribeMatchmaking((message) => {
            //this message says that the player is waiting in matchmaking
            console.log(message);
            //function that shows matchmaking modal
            this.setState({ matchmakingOpen: true });
        });

        socketAPI.subscribeJoinedGame((userId) => {
            console.log("Found a session with user...", userId);
            this.props.history.push('/game');
            this.setState({ matchmakingOpen: false });

        });

        socketAPI.subscribeGameStart((sessionId) => {
            console.log("Your session id is...", sessionId);
            this.setState({ matchmakingOpen: false });

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
        if (this.state.matchmakingOpen) {
            return (
                        <div className="circlecontainer">
                        <div className="lds-circle"><div>
                        </div><h5 className="match">Looking for a match...</h5></div>
                        </div>
                    );
        }
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