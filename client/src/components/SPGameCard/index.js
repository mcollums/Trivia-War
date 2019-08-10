import React from "react";


const SPGameCard = props => (
    <div>
        <button id={props.id} onClick={() => props.loadPage(props.id)}>
            <div className="scategory" id="scategory1">
                <div className="scatcat"><strong>{props.category}</strong></div>
            </div>
        </button >
    </div >
);
export default SPGameCard;