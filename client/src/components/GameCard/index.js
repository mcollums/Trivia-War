import React from "react";
import "./style.css";

const styles = {
    marginTop: "20px",
    borderColor: "grey"
    
}

const GameCard = props => (

    <div>
        <div style={styles} id={props.answer} onClick={() => props.handleSelection(props.id)} className="card grow spAnswer" >
            <h3 className="spAnswer">{props.id}</h3>
        </div>
    </div>

);


export default GameCard;