import React from "react";
import './style.css';

const styles = {
    marginTop: "30px"
}

const SPGameCard = props => (
    <div>
        <div style={styles} id={props.id} className="scategory" onClick={() => props.loadPage(props.id)}>
            <div><img className="catImage" src={props.image} alt={props.id}/></div>

            <div className="scatcat"><strong>{props.category}</strong></div>
        </div>
    </div >
);
export default SPGameCard;