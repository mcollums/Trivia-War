import React from "react";

const styles = {
    marginTop: "10px"
}

const MPCategory = props => (
    <div>
        <div style={styles} id={props.id} className="scategory" onClick={() => props.handleSelect(props.id)}>
            <div><img className="catImage" src={props.image} /></div>
            <div className="scatcat"><strong>{props.category}</strong></div>
        </div>
    </div >
);
export default MPCategory;