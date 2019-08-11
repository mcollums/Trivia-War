import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import socketAPI from "../utils/socketAPI";
import API from "../utils/API";
import MPGameCard from "../components/MPGameCard";
import GameContainer from './GameContainer';


class MultiPlayer extends Component {
    state = {
        category: [],
        selected: "",
        gameStart: false
    }

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

    handleCatSelect = category => {
        console.log("User chose: " + category);
        this.setState({
            selected: category
        })
        this.publishSeekGame(category);
    }

    render() {
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
                    <GameContainer id={this.state.id} />
                )}
        </div>
        )
    };
}


export default withRouter(MultiPlayer);