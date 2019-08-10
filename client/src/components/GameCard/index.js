import React from "react";
// import "./GameCard.css";

const styles = {
    marginTop: "20px",
    borderColor: "grey"
}

const GameCard = props => (

    <div>
        {/* {props.click === "false" ? ( */}

        <div style={styles} id={props.answer} onClick={() => props.handleSelection(props.id)} className="card grow" >
            <h3>{props.id}</h3>
        </div>
        {/* ) : ( */}
        {/* <div>
                    <div style={styles} id={props.answer} onClick={() => props.handleSelection(props.id)} className="card grow" >
                        <h3>{props.id}</h3>
                    </div>
                    <div>
                        <h3>{props.correctAnswer}</h3>
                    </div>
                </div>
            ) */}
        {/* } */}
    </div>

);


export default GameCard;