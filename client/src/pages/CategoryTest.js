import React, { Component } from "react";
import Category from "../components/Category";

class CategoryTest extends Component {

// State goes here
render(){
    return (
        <div>
            <Category id="1" category="animals" status="open"/>
            <Category id="2" category="disney" status="open"/>
        </div>
    )
    }
}

export default CategoryTest;