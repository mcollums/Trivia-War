import React, { Component } from "react";
import Category from "../components/Category";



class CategoryTest extends Component {
    state = {
        userId: ""
    }

    componentDidMount() {
        console.log("Params User Id " + this.props.match.params.userId)
        this.setState({
            userId: this.props.match.params.userId
        })
    }

    handleClickCategory = (userId) => {
        let path = "/matchmaking/" + userId;
        this.props.history.push(path);
    }

// State goes here
render(){
    return (
        <div>
            <Category id="1" category="animals" status="open" 
                onClick={() => this.handleClickCategory(this.state.userId)}/>
            <Category id="2" category="disney" status="open"
                onClick={() => this.handleClickCategory(this.state.userId)}/>
        </div>
    )
    }
}

export default CategoryTest;