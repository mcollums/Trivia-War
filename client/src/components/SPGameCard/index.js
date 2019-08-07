import React from "react";

const SPGameCard = props => (
    <div id={props.answer} onClick={() => props.handleSelection(props.id, props.socketid)} className="card grow" >
        <h3>{props.answer}</h3>
    </div>
);

export default SPGameCard;