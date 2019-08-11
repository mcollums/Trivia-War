import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import socketAPI from "../utils/socketAPI";
import API from "../utils/API";
import MPGameCard from "../components/MPGameCard";
import GameContainer from './GameContainer';
import Modal from 'react-modal';


class MultiPlayer extends Component {
    state = {
        category: [],
        selected: "",
        gameStart: false,
        matchmakingOpen: false,
    }
    
    // openModal = modal => {
    //     this.setState({ [modal]: true });
    // }

    componentDidMount() {
        API.getGames().then(res => {
            this.setState({
                category: res.data
            }, () => console.log(this.state.category))
        });

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

    handleCatSelect = (id) => {
        console.log("User chose: " + id);

        this.setState({
            selected: id
        })
        this.publishSeekGame(id);
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
            <div>
            {this.state.selected === "" ? (
                <div className="scatContain">
                    {this.state.category.map(category => (
                        <MPGameCard
                            id={category._id}
                            key={category._id}
                            category={category.category}
                            handleSelect={this.handleCatSelect}
                        />
                    ))}
                </div>
            ) : (
                    <GameContainer id={this.state.selected} />
                )}
        </div>
        )
    };
}


export default withRouter(MultiPlayer);