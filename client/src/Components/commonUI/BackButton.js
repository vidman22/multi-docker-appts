import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const BackButton = (props) => {
    return (
        <button className="BackButton" onClick={props.changecomponent}>{props.content === 'font-awesome' ? <FontAwesomeIcon icon={faArrowLeft} /> : 'Back'} </button>
    );
}

export default BackButton;
