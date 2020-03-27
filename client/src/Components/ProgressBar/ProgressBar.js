import React from 'react';

import './ProgressBar.css';

const ProgressBar = (props) => {
    return (
        <div className="ProgressBarWrapper">
            <ul className="ProgressBar">
                <li className={props.renderedcomponent === 'location' || props.renderedcomponent === 'completed' || props.renderedcomponent === 'provider' ? 'active' : ''}>Visit Type</li>
                <li className={props.renderedcomponent === 'provider'  ? 'active' : ''}>Location</li>
                <li className={props.renderedcomponent === 'completed' ? 'active' : ''}>Provider</li>
                <li className={props.renderedcomponent === 'completed' ? 'active' : ''}>Schedule</li>
            </ul>
        </div>
    );
}

export default ProgressBar;
