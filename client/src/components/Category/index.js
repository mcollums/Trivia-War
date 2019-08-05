import React from "react";

function Category(props) {
    return (
        <div className="card">
            <div className="category">
                <strong>Category</strong> {props.category}
            </div>
            <div className="game-status">
                <strong>Game Status</strong> {props.status}
            </div>
        </div>

    );
}

export default Category;
