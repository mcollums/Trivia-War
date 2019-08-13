import React from "react";


const styles = {
    marginTop: "20px",
    borderColor: "grey"
}

const MPGameCard = props => (

    <div>
        <div style={styles} id={props.answer} onClick={() => props.publishPlayerSelect(props.id)} className="card grow" >
            <h3>{props.id}</h3>
        </div>
    </div>

);


export default MPGameCard;