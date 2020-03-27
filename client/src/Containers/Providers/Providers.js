import React, { Component } from 'react';

import PCPs from '../../Lists/PCPs';
import RenderedPCPTable from '../../Components/RenderedPCPTable/RenderedPCPTable';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Providers.css';

const getSuggestions = value => {
    let inputValue = value.trim().toLowerCase();
    let inputLength = inputValue.length;
    let suggestions = [];
    let pcps = PCPs.map((pcp) => {
        return {name: pcp.firstName + ' ' + pcp.lastName}
    })
    for ( let i =0; i < PCPs.length; i++){
        if (pcps[i].name.toLowerCase().slice(0, inputLength) === inputValue){
          suggestions.push(PCPs[i])
        }
    }
    if (suggestions.length === 0 ){
      inputValue = value.trim().toLowerCase().split(" ");
      inputLength = inputValue.length;
      // console.log("inner fired");
      for (let i = 0; i < inputLength; i++){
        for (let j = 0; j < PCPs.length; j++ ){
            if (pcps[j].name.toLowerCase().indexOf(inputValue[i]) !== -1){
                suggestions.push(PCPs[j]);
            }
        }   
      }
    } 
    return suggestions = suggestions.filter((a, b) => suggestions.indexOf(a) === b );;
}

export class Providers extends Component {
    constructor(props){
        super(props);
        this.state = {
            gender:false,
            care: false,
            type: false,
            language: false,
            specialty: false,
            filters: {
                gender: {
                    male: {name: 'Male', type: "radio", checked: ''},
                    female: {name: 'Female', type: "radio", checked: ''},
                },
                title: {
                    DO:{name: 'DO', type: "radio", checked: ''},
                    MD:{name: 'MD', type: "radio", checked: ''},
                    NP:{name: 'NP', type: "radio", checked: ''},
                    PA:{name: 'PA', type: "radio", checked: ''},
                },
                specialty: {
                    familyMedicine: {name: 'Family Medicine', type: "radio", checked: ''},
                    preventativeMedicine: {name: 'Preventative Medicine', type: "radio", checked: ''},
                    internalMedicine: {name: 'Internal Medicine', type: "radio", checked: ''},
                    integrativeMedicine: {name: 'Integrative Medicine', type: "radio", checked: ''},
                    aestheticMedicine: {name: 'Aesthetic Medicine', type: "radio", checked: ''},
                    geriatricMedicine: {name: 'Geriatrics', type: "radio", checked: ''},
                    emergencyMedicine: {name: 'Emergency Medicine', type: "radio", checked: ''},
                    chronicCare: {name: 'Chronic Care', type: "radio", checked: ''},
                    mentalHealth: {name: 'Mental Health', type: "radio", checked: ''},
                    gerontology: {name: 'Gerontology', type: "radio", checked: ''},
                    hospice: {name: 'Hospice', type: "radio", checked: ''},
                    womensHealth: {name: "Womens' Health", type: "radio", checked: ''},
                    reproductiveHealth: {name: 'Reproductive Health', type: "radio", checked: ''},
                    orthopedics: {name: 'Orthopedics', type: "radio", checked: ''},
                },
                care : {
                    sutureRemoval: {name: 'Suture Removal', type: "checkbox", checked: false},
                    suturePlacement: {name: 'Suture Placement', type: "checkbox", checked: false},
                    IUDRemoval: {name: 'IUD Removal', type: "checkbox", checked: false},
                    IUDPlacement: {name: 'IUD Placement', type: "checkbox", checked: false},
                    nexplanonPlacement: {name: 'Nexplanon Placement', type: "checkbox", checked: false},
                    nexplanonRemoval: {name: 'Nexplanon Removal', type: "checkbox", checked: false},
                },
                languages:{
                    arabic: {name: 'Arabic', type: "radio", checked: '' },
                    dutch: {name: 'Dutch', type: "radio", checked: '' },
                    german: {name: 'German', type: "radio", checked: '' },
                    hindi: {name: 'Hindi', type: "radio", checked: '' },
                    nepali: {name: 'Nepali', type: "radio", checked: '' },
                    polish: {name: 'Polish', type: "radio", checked: '' },
                    russian: {name: 'Russian', type: "radio", checked: '' },
                    spanish: {name: 'Spanish', type: "radio", checked: '' },
                    tagolog: {name: 'Tagolog', type: "radio", checked: '' },
                    vietnamese: {name: 'Vietnamese', type: "radio", checked: '' },
                },

            },
            value: '',
            suggestions: [],
        };
    }
    onChange(e){
        this.setState({
            value: e.target.value,
            suggestions: getSuggestions(e.target.value),
        })
    }
    onFilterChange = (formID, filterID, type) => {

        // console.log("formId, filterID", formID, filterID);
        const updatedFilters = {...this.state.filters};
        const updatedCategory = {...updatedFilters[formID]};
        
        
        if (type === 'radio'){
                for ( let key in updatedCategory){
                    const updatedRadioFilter = {...updatedCategory[key]}
                    updatedRadioFilter.checked = filterID;
                    updatedCategory[key] = updatedRadioFilter;
                    updatedFilters[formID]  = updatedCategory;
                }

            // console.log("Updated Category", updatedCategory);
            
        }
        if (type === 'checkbox'){
            const updatedFilter = {...updatedCategory[filterID]};

            updatedFilter.checked = !updatedFilter.checked;
        
            updatedCategory[filterID] = updatedFilter;
            updatedFilters[formID]  = updatedCategory;
        }

        this.setState({
            filters: updatedFilters,
        })
    }

    clear = (formID) =>{
        const updatedFilters = {...this.state.filters};
        const updatedCategory = {...updatedFilters[formID]};

        for (let key in updatedCategory){
            const updatedFilter = {...updatedCategory[key]}
            updatedFilter.checked = false;
            updatedCategory[key] = updatedFilter;
            updatedFilters[formID]  = updatedCategory;
        }
                    
        updatedFilters[formID]  = updatedCategory;

        this.setState({
            filters: updatedFilters,
        })

    }

    toggleFilterHeader = (type) => {

        this.setState( prevState => {
            return { [type]: !prevState[type]}
        });

    }

    render() {
        let formArray = [];
        for (let key in this.state.filters){
            let filtersArray = [];
            for (let prop in this.state.filters[key]){
                filtersArray.push({
                    id: prop, 
                    config: this.state.filters[key][prop]
                })
            }
            formArray.push({
                id: key,
                config: filtersArray
            })
        }

        return (

            <div className="ProviderSearch">
                <div className="FilterSideBar">
                
                    {formArray.map(form => {
                        return <div className="FilterWrapper" key={form.id}>
                            <div className="SideBarFilterHeader" onClick={() => this.toggleFilterHeader(form.id)}>
                                {form.id} <FontAwesomeIcon icon={this.state[form.id] ? faCaretDown : faCaretRight} />
                            </div>
                            {this.state[form.id] && <div className="ClearFilter" onClick={() => this.clear(form.id)}>clear filter</div>}
                            <div className="ListItems">
                                {this.state[form.id] && form.config.map( filter => {
                                
                                        return (
                                            <label key={filter.id} className={filter.config.type === 'radio' ? "VisitTypeRadio" : "VisitTypeCheckBox"}>
                                                <input
                                                    onChange={() => this.onFilterChange( form.id, filter.id, filter.config.type )}
                                                    type={filter.config.type}
                                                    checked={filter.config.type === 'radio' ? (filter.config.checked === filter.id) : filter.config.checked}
                                                    name={filter.id}>
                                                </input>
                                                    {filter.config.type === 'checkbox' && <span className="CustomCheckbox"></span>}
                                                <div className="ConfigName">{filter.config.name}</div>
                                            </label>
                                        )
                                })}
                            </div>
                        </div>
                    })}
                </div>
               
                <input 
                    className="ProviderSearchInput"
                    onChange={(e) => this.onChange(e)}
                    type="text"
                    value={this.state.value}
                    placeholder="Search by name"
                    name="value"
                />

            <RenderedPCPTable suggestions={this.state.suggestions} filters={this.state.filters}/>
                
            </div>
        );
    }
}

export default Providers;