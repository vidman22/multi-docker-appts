import React from 'react';

// import PCPs from '../../Lists/PCPs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserMd} from '@fortawesome/free-solid-svg-icons';


const RenderedPCPTable = (props) => {
    let {suggestions, filters} = props;
    let filteredSuggestions = [];
    for (let prop in filters){
        switch(prop){
            case 'gender':

                if (filters[prop].male.checked){
                   filteredSuggestions = suggestions.filter(sugg => sugg.gender === filters[prop].male.checked);
                } else {
                    filteredSuggestions = suggestions;
                }

            break;
            case 'title':
                if (filters[prop].NP.checked){
                    filteredSuggestions = filteredSuggestions.filter(sugg => sugg.title === filters[prop].NP.checked)
                }

            break;
            case 'care':
                for (let key in filters[prop]){
                    if (filters[prop][key].checked){
                        filteredSuggestions = filteredSuggestions.filter(sugg => sugg.care[key]);
                    }
                }
            break;
            case 'languages':
                if (filters[prop].arabic.checked){
                    filteredSuggestions = filteredSuggestions.filter(sugg => sugg.language[filters[prop].arabic.checked])
                }

            break;
            case 'specialty':
                if (filters[prop].familyMedicine.checked){
                    filteredSuggestions = filteredSuggestions.filter(sugg => sugg.specialty[filters[prop].familyMedicine.checked])
                }
            break;
            default:
            break;
        }
    }

    return (
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Specialty</th>
                    </tr>
                    {filteredSuggestions.length ? filteredSuggestions.map(pcp => {
                        return (
                            <tr key={Math.random()}>
                                <td>
                                    {pcp.img ? <img alt="Primary Care Physician" className="PCPListImg" src={pcp.img} height="50" width="50"/> : <FontAwesomeIcon icon={faUserMd} size="2x" />}
                                </td>
                                <td>
                                    {pcp.firstName + ' ' + pcp.lastName}
                                </td>
                                <td>
                                    {pcp.title}
                                </td>
                                <td>
                                    {pcp.specialInterests[0]}
                                </td>
                            </tr>
                        )
                    }): null}
                </tbody>
            </table>
    );
}

export default RenderedPCPTable;
