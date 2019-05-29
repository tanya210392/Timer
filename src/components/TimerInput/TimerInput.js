import React from 'react';

import Input from '../../UI/Input/Input';
import './TimerInput.css';

const TimerInput = props => {
    let {inputValue, handleChange, start, reset} = props;

    return (
        <div className="TimerInput">
            <h3>Countdown:</h3>
            <Input
                type="text"
                placeholder="(Min)"
                value={inputValue}
                onChange={handleChange}
            />
            {start}
            {reset}
        </div>
    );
};

export default TimerInput;
