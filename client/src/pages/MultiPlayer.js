import React, { Component } from "react";
import Category from "../components/Category";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

class MultiPlayer extends Component {
    state ={
        redirectTo: null,
    }
    loadPage() {
        document.getElementById("myLink").onclick = function () {
        // window.location.href = "/loading";
        this.setState({ redirectTo: "/loading" });
            }
        };

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={this.state.redirectTo} />
        }
        return (
            <div className="scatContain">
                <Link to="/game">
                <div className="mcategory" id="mcategory1">
                <div className="mcatcat"></div>

                </div>
                </Link>
                <div className="mcategory" id="mcategory2">
                <div className="mcatcat"></div>
                    
                </div>
                <div className="mcategory" id="mcategory3">
                <div className="mcatcat"></div>
                    
                </div>
                <div className="mcategory" id="mcategory4">
                <div className="mcatcat"></div>
                </div>
                <div className="mcategory" id="mcategory5">
                <div className="mcatcat"></div>
                </div>
                <div className="mcategory" id="mcategory6">
                <div className="mcatcat"></div>
                </div>
                <div className="mcategory" id="mcategory7">
                <div className="mcatcat"></div> 
                </div>
                <div className="mcategory" id="mcategory8">
                <div className="mcatcat"></div> 
                </div>
                
            </div>
        )

    };

}


export default MultiPlayer;