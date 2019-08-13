import React from "react";
import "./SPGameCard.css"

const styles = {
    marginTop: "10px"
}

const SPGameCard = props => (
    <div>
        {/* <button id={props.id} onClick={() => props.loadPage(props.id)}> */}
            <div style={styles} id={props.id} className="scategory" onClick={() => props.loadPage(props.id)}>
                <div className="scatcat"><strong>{props.category}</strong></div>
            </div>
        {/* </button > */}
    </div >
);
export default SPGameCard;