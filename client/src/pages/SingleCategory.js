import React, { Component } from "react";
// import WaitingPage from "./pages/WaitingPage";
import './Pages.css';


class SingleCategory extends Component {

    loadPage() {
        // API.
        document.getElementById("myButton").onclick = function () {
            window.location.href = "/loading";
        }
    };

    render() {
        return (
            <div className="scatContain">

                <button id="myButton" onClick={this.loadPage}>
                    <div className="scategory" id="scategory1">
                        <div className="scatcat"></div>

                    </div>
                </button>
                {/* <div className="scategory" id="scategory2">
                    <div className="scatcat"></div>
                    
                </div>
                <div className="scategory" id="scategory3">
                    <div className="scatcat"></div>
                    
                </div>
                <div className="scategory" id="scategory4">
                    <div className="scatcat"></div>
                    
                </div>
                <div className="scategory" id="scategory5">
                    <div className="scatcat"></div>
                    
                </div>
                <div className="scategory" id="scategory6">
                    <div className="scatcat"></div>
                    
                </div>
                */}

            </div>
        )

    };

}


export default SingleCategory;
