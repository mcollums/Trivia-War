import React from "react";
// import "./GameCard.css";

const GameCard = props => (
    <div id={props.name} onClick={() => props.handleClick(props.id)} className="card grow" >
        <img className="card-img-top" src={props.image} alt={props.name} />
    </div>
);

export default GameCard;