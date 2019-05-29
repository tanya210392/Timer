import React from 'react';

import './CountdownTimer.css';

const CountdownTimer = props => {
    let {setTextColor, message, minutes, seconds, pause, resume} = props;

    return (
        <div className="CountdownTimer">
            <p className={setTextColor ? "Red" : ""}>{message}</p>
            <span>{minutes}:{seconds}</span>
            {pause || resume}
        </div>
    );
};

export default CountdownTimer;
