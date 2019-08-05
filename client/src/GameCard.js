import React from "react";
// import "./GameCard.css";

const GameCard = props => (
    <div id={props.id} onClick={() => props.handleClick(props.id)} className="card grow" >
        <h2>{ props.question }</h2>
    </div>
);

export default GameCard;