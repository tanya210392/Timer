import React from 'react';

import './Button.css';

const button = props => {
    let {btnClass, disabled, children, clicked} = props;

    return (
        <div className={["ButtonWrapper", btnClass].join(' ')}>
            <button
                className={["Button", btnClass].join(' ')}
                onClick={clicked}
                disabled={disabled}
            >
                {children}
            </button>
        </div>
    );
};

export default button;
