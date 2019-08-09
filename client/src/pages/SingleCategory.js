import React, { Component } from "react";
// import WaitingPage from "./pages/WaitingPage";
import './Pages.css';
import API from "../utils/API";
import SPGameCard from "../components/SPGameCard";


let addCategory = [];
class SingleCategory extends Component {
    state = {
        category: [],
        id: ""
    };


    componentDidMount() {
        API.getGames().then(res => {
            console.log(res.data[0].category);
            this.getAllGames(res.data);


        });
    }

    loadPage(id) {
        console.log(id);
        this.setState({
            id: id
        })
        // API.getOneGame(id)
    };
    getAllGames(data) {
        // console.log(data);

        for (let i = 0; i < data.length; i++) {
            addCategory.push(data[i]);
        }
        this.setState({
            category: addCategory

        }, () => {
            console.log("State category", this.state.category);
        });
    }

    render() {
        return (
            <div className="scatContain">
                {this.state.category.map(category => (
                    <SPGameCard
                        id={category._id}
                        key={category._id}
                        category={category.category}
                        loadPage={this.loadPage.bind(this)}
                    />
                ))}
            </div>
        )

    };

}


export default SingleCategory;
