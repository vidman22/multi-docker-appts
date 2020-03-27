import React from 'react';

import './common.css'

const NextButton = (props) => {
    return (
        <button className="NextButton" onClick={props.changecomponent} >{props.name}</button>
    );
}

export default NextButton;