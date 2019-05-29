import React from 'react';

import Button from '../../UI/Button/Button';
import './Speed.css';

const Speed = props => {

    return (
        <div className="Speed">
            <Button
                clicked={props.switchSpeedHandler.bind(this, "normal")}
                btnClass={`speed ${props.speed === "normal" ? "active" : ""}`}
            >1.0X</Button>
            <Button
                clicked={props.switchSpeedHandler.bind(this, "faster")}
                btnClass={`speed ${props.speed === "faster" ? "active" : ""}`}
            >1.5X</Button>
            <Button
                clicked={props.switchSpeedHandler.bind(this, "fastest")}
                btnClass={`speed ${props.speed === "fastest" ? "active" : ""}`}
            >3X</Button>
        </div>
    );
};

export default Speed;
