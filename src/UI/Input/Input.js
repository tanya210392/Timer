import React from 'react';

import './Input.css';

const input = props => {
    return <input
        {...props}
        className="Input"
    />;
};

export default input;
