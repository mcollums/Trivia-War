import React from "react";
import './style.css';

const SPGameCard = props => (
    <div>
        <button id={props.id} onClick={() => props.loadPage(props.id)}>
            <div className="scategory" id="scategory1">
            <div><img className="catImage" src={props.image}/></div>
                <div className="scatcat">
                    <strong>{props.category}</strong>
                </div>
            </div>
        </button >
    </div >
);
export default SPGameCard;