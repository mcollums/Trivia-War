import React from "react";
// import "./GameCard.css";

const GameCard = props => (
    <div id={props.answer} onClick={() => props.handleSelection(props.id)} className="card grow" >
        <h3>{ props.answer }</h3>
    </div>
);

export default GameCard;