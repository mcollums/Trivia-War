import React, { Component } from "react";
import Category from "../components/Category";

class MatchMaking extends Component {

// State goes here
render(){
    return (
        <div>
            <h1>This is the matchmaking page</h1>
            <Category/>
        </div>
    )
}
}

export default MatchMaking;