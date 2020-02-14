import React from 'react';
import './style.scss';

import { Card } from 'react-bootstrap';

// const styles = {
//     marginTop: "30px"
// }

const SPGameCard = props => (
    <>
    {/* <div style={styles}
        id={props.id}
        className="scategory"
        onClick={() => props.loadPage(props.id)}>
        <div>
            <img className="catImage" src={props.image} alt={props.id} />
        </div>
        <div className="scatcat"><strong>{props.category}</strong></div>
    </div> */}

    <Card   id={props.id}
            className="scategory"
            onClick={() => props.loadPage(props.id)}>
        <Card.Img variant="top" src={props.image} />
        <Card.Body>
            <Card.Title>{props.category}</Card.Title>
        </Card.Body>
    </Card>
    </>

);

export default SPGameCard;