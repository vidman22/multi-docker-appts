import React from 'react';

import BackButton from '../commonUI/BackButton';

import './FinalPage.css';

const FinalPage = (props) => {
    const {pcp} = props;
    return (
        <div className="FinalPage">
            <BackButton content="Back" changecomponent={() => props.changecomponent('visitType')}/>
        <h1>{props.location && props.location.name } {pcp && pcp.firstName + ' ' + pcp.lastName + ', ' + pcp.title } Schedule</h1>
            <div className="ClipIframe">
                <iframe 
                   src={props.url}
                   frameBorder="0"
                   className="IframeLocationMyChart"
                   width="720px"
                   height="525px"
                   title="MyChart"
                   styles={{ clip:"rect(5px, 0px, 0px, 0px)", position: 'absolute', overflow: "hidden"}}

                ></iframe>
            </div>
            
        </div>
    );
}

export default FinalPage;
