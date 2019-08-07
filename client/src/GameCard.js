import React from "react";
// import "./GameCard.css";

const GameCard = props => (
    <div id={props.answer} onClick={() => props.handleSelection(props.id, props.socketid)}
        className="card grow" >
        <h3>{props.answer} </h3>

    </div>
);

export default GameCard;