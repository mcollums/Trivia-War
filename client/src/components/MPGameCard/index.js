import React from "react";
// import "./GameCard.css";

const styles = {
    marginTop: "20px",
    borderColor: "grey"
}

const GameCard = props => (

    <div>
        <div style={styles} id={props.answer} onClick={() => props.publishPlayerSelect(props.id)} className="card grow" >
            <h3>{props.id}</h3>
        </div>
    </div>

);


export default GameCard;